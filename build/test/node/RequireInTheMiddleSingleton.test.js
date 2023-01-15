"use strict";
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sinon = require("sinon");
const path = require("path");
const RequireInTheMiddleSingleton_1 = require("../../src/platform/node/RequireInTheMiddleSingleton");
const requireInTheMiddleSingleton = RequireInTheMiddleSingleton_1.RequireInTheMiddleSingleton.getInstance();
const makeOnRequiresStub = (label) => sinon.stub().callsFake(((exports) => {
    var _a;
    (_a = exports.__ritmOnRequires) !== null && _a !== void 0 ? _a : (exports.__ritmOnRequires = []);
    exports.__ritmOnRequires.push(label);
    return exports;
}));
describe('RequireInTheMiddleSingleton', () => {
    describe('register', () => {
        const onRequireFsStub = makeOnRequiresStub('fs');
        const onRequireFsPromisesStub = makeOnRequiresStub('fs-promises');
        const onRequireCodecovStub = makeOnRequiresStub('codecov');
        const onRequireCodecovLibStub = makeOnRequiresStub('codecov-lib');
        const onRequireCpxStub = makeOnRequiresStub('cpx');
        const onRequireCpxLibStub = makeOnRequiresStub('cpx-lib');
        before(() => {
            requireInTheMiddleSingleton.register('fs', onRequireFsStub);
            requireInTheMiddleSingleton.register('fs/promises', onRequireFsPromisesStub);
            requireInTheMiddleSingleton.register('codecov', onRequireCodecovStub);
            requireInTheMiddleSingleton.register('codecov/lib/codecov.js', onRequireCodecovLibStub);
            requireInTheMiddleSingleton.register('cpx', onRequireCpxStub);
            requireInTheMiddleSingleton.register('cpx/lib/copy-sync.js', onRequireCpxLibStub);
        });
        beforeEach(() => {
            onRequireFsStub.resetHistory();
            onRequireFsPromisesStub.resetHistory();
            onRequireCodecovStub.resetHistory();
            onRequireCodecovLibStub.resetHistory();
            onRequireCpxStub.resetHistory();
            onRequireCpxLibStub.resetHistory();
        });
        it('should return a hooked object', () => {
            const moduleName = 'm';
            const onRequire = makeOnRequiresStub('m');
            const hooked = requireInTheMiddleSingleton.register(moduleName, onRequire);
            assert.deepStrictEqual(hooked, { moduleName, onRequire });
        });
        describe('core module', () => {
            describe('AND module name matches', () => {
                it('should call `onRequire`', () => {
                    const exports = require('fs');
                    assert.deepStrictEqual(exports.__ritmOnRequires, ['fs']);
                    sinon.assert.calledOnceWithExactly(onRequireFsStub, exports, 'fs', undefined);
                    sinon.assert.notCalled(onRequireFsPromisesStub);
                });
            });
            describe('AND module name does not match', () => {
                it('should not call `onRequire`', () => {
                    const exports = require('crypto');
                    assert.equal(exports.__ritmOnRequires, undefined);
                    sinon.assert.notCalled(onRequireFsStub);
                });
            });
        });
        describe('core module with sub-path', () => {
            describe('AND module name matches', () => {
                it('should call `onRequire`', () => {
                    const exports = require('fs/promises');
                    assert.deepStrictEqual(exports.__ritmOnRequires, ['fs-promises']);
                    sinon.assert.calledOnceWithExactly(onRequireFsPromisesStub, exports, 'fs/promises', undefined);
                    sinon.assert.notCalled(onRequireFsStub);
                });
            });
        });
        describe('non-core module', () => {
            describe('AND module name matches', () => {
                const baseDir = path.dirname(require.resolve('codecov'));
                const modulePath = path.join('codecov', 'lib', 'codecov.js');
                it('should call `onRequire`', () => {
                    const exports = require('codecov');
                    assert.deepStrictEqual(exports.__ritmOnRequires, ['codecov']);
                    sinon.assert.calledWithExactly(onRequireCodecovStub, exports, 'codecov', baseDir);
                    sinon.assert.calledWithMatch(onRequireCodecovStub, { __ritmOnRequires: ['codecov', 'codecov-lib'] }, modulePath, baseDir);
                    sinon.assert.calledWithMatch(onRequireCodecovLibStub, { __ritmOnRequires: ['codecov', 'codecov-lib'] }, modulePath, baseDir);
                }).timeout(30000);
            });
        });
        describe('non-core module with sub-path', () => {
            describe('AND module name matches', () => {
                const baseDir = path.resolve(path.dirname(require.resolve('cpx')), '..');
                const modulePath = path.join('cpx', 'lib', 'copy-sync.js');
                it('should call `onRequire`', () => {
                    const exports = require('cpx/lib/copy-sync');
                    assert.deepStrictEqual(exports.__ritmOnRequires, ['cpx', 'cpx-lib']);
                    sinon.assert.calledWithMatch(onRequireCpxStub, { __ritmOnRequires: ['cpx', 'cpx-lib'] }, modulePath, baseDir);
                    sinon.assert.calledWithExactly(onRequireCpxStub, exports, modulePath, baseDir);
                    sinon.assert.calledWithExactly(onRequireCpxLibStub, exports, modulePath, baseDir);
                });
            });
        });
    });
});
//# sourceMappingURL=RequireInTheMiddleSingleton.test.js.map
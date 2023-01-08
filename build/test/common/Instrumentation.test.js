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
const src_1 = require("../../src");
class TestInstrumentation extends src_1.InstrumentationBase {
    constructor(config = {}) {
        super('test', '1.0.0', Object.assign({}, config));
    }
    enable() { }
    disable() { }
    init() { }
}
describe('BaseInstrumentation', () => {
    let instrumentation;
    beforeEach(() => {
        instrumentation = new TestInstrumentation();
    });
    it('should create an instance', () => {
        assert.ok(instrumentation instanceof src_1.InstrumentationBase);
    });
    it('should have a name', () => {
        assert.deepStrictEqual(instrumentation.instrumentationName, 'test');
    });
    it('should have a version', () => {
        assert.deepStrictEqual(instrumentation.instrumentationVersion, '1.0.0');
    });
    describe('constructor', () => {
        it('should enable instrumentation by default', () => {
            let called = false;
            class TestInstrumentation2 extends TestInstrumentation {
                enable() {
                    called = true;
                }
            }
            instrumentation = new TestInstrumentation2();
            assert.strictEqual(called, true);
        });
    });
    describe('getConfig', () => {
        it('should return instrumentation config', () => {
            const instrumentation = new TestInstrumentation({
                isActive: false,
            });
            const configuration = instrumentation.getConfig();
            assert.notStrictEqual(configuration, null);
            assert.strictEqual(configuration.isActive, false);
        });
    });
    describe('setConfig', () => {
        it('should set a new config for instrumentation', () => {
            const instrumentation = new TestInstrumentation();
            const config = {
                isActive: true,
            };
            instrumentation.setConfig(config);
            const configuration = instrumentation.getConfig();
            assert.strictEqual(configuration.isActive, true);
        });
    });
});
//# sourceMappingURL=Instrumentation.test.js.map
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
const path_1 = require("path");
const src_1 = require("../../src");
describe('InstrumentationNodeModuleFile', () => {
    it('should convert path', () => {
        const tests = ['c:\\\\foo\\\\bar\\aa', '///home//foo/bar///aa'];
        tests.forEach(name => {
            const instrumentationNodeModuleFile = new src_1.InstrumentationNodeModuleFile(name, [], () => { }, () => { });
            assert.strictEqual(instrumentationNodeModuleFile.name, (0, path_1.normalize)(name));
        });
    });
});
//# sourceMappingURL=InstrumentationNodeModuleFile.test.js.map
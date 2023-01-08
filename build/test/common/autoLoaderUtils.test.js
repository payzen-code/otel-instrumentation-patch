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
const autoLoaderUtils_1 = require("../../src/autoLoaderUtils");
class FooInstrumentation extends src_1.InstrumentationBase {
    constructor() {
        super('foo', '1', {});
    }
    init() {
        return [];
    }
    enable() { }
    disable() { }
}
// const fooInstrumentation = new FooInstrumentation();
describe('autoLoaderUtils', () => {
    describe('parseInstrumentationOptions', () => {
        it('should create a new instrumentation from class', () => {
            const { instrumentations } = (0, autoLoaderUtils_1.parseInstrumentationOptions)([
                FooInstrumentation,
            ]);
            assert.strictEqual(instrumentations.length, 1);
            const instrumentation = instrumentations[0];
            assert.ok(instrumentation instanceof src_1.InstrumentationBase);
        });
        it('should return an instrumentation from Instrumentation', () => {
            const { instrumentations } = (0, autoLoaderUtils_1.parseInstrumentationOptions)([
                new FooInstrumentation(),
            ]);
            assert.strictEqual(instrumentations.length, 1);
            const instrumentation = instrumentations[0];
            assert.ok(instrumentation instanceof src_1.InstrumentationBase);
        });
    });
});
//# sourceMappingURL=autoLoaderUtils.test.js.map
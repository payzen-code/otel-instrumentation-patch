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
const src_1 = require("../../src");
class DummyTracerProvider {
    getTracer(name, version) {
        throw new Error('not implemented');
    }
}
class DummyMeterProvider {
    getMeter(name, version, options) {
        throw new Error('not implemented');
    }
}
class FooInstrumentation extends src_1.InstrumentationBase {
    init() {
        return [];
    }
    enable() { }
    disable() { }
}
describe('autoLoader', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let unload;
    afterEach(() => {
        sinon.restore();
        if (typeof unload === 'function') {
            unload();
            unload = undefined;
        }
    });
    describe('registerInstrumentations', () => {
        describe('InstrumentationBase', () => {
            let instrumentation;
            let enableSpy;
            let setTracerProviderSpy;
            let setMeterProviderSpy;
            const tracerProvider = new DummyTracerProvider();
            const meterProvider = new DummyMeterProvider();
            beforeEach(() => {
                instrumentation = new FooInstrumentation('foo', '1', {});
                enableSpy = sinon.spy(instrumentation, 'enable');
                setTracerProviderSpy = sinon.stub(instrumentation, 'setTracerProvider');
                setMeterProviderSpy = sinon.stub(instrumentation, 'setMeterProvider');
                unload = (0, src_1.registerInstrumentations)({
                    instrumentations: [instrumentation],
                    tracerProvider,
                    meterProvider,
                });
            });
            afterEach(() => {
                Object.keys(require.cache).forEach(key => delete require.cache[key]);
                if (typeof unload === 'function') {
                    unload();
                    unload = undefined;
                }
            });
            it('should enable disabled instrumentation', () => {
                if (typeof unload === 'function') {
                    unload();
                    unload = undefined;
                }
                instrumentation = new FooInstrumentation('foo', '1', { enabled: false });
                enableSpy = sinon.spy(instrumentation, 'enable');
                setTracerProviderSpy = sinon.stub(instrumentation, 'setTracerProvider');
                setMeterProviderSpy = sinon.stub(instrumentation, 'setMeterProvider');
                unload = (0, src_1.registerInstrumentations)({
                    instrumentations: [instrumentation],
                    tracerProvider,
                    meterProvider,
                });
                assert.strictEqual(enableSpy.callCount, 1);
            });
            it('should NOT enable enabled instrumentation', () => {
                assert.strictEqual(enableSpy.callCount, 0);
            });
            it('should set TracerProvider', () => {
                assert.strictEqual(setTracerProviderSpy.callCount, 1);
                assert.ok(setTracerProviderSpy.lastCall.args[0] === tracerProvider);
                assert.strictEqual(setTracerProviderSpy.lastCall.args.length, 1);
            });
            it('should set MeterProvider', () => {
                assert.strictEqual(setMeterProviderSpy.callCount, 1);
                assert.ok(setMeterProviderSpy.lastCall.args[0] === meterProvider);
                assert.strictEqual(setMeterProviderSpy.lastCall.args.length, 1);
            });
        });
    });
});
//# sourceMappingURL=autoLoader.test.js.map
import * as RequireInTheMiddle from 'require-in-the-middle';
export declare type Hooked = {
    moduleName: string;
    onRequire: RequireInTheMiddle.OnRequireFn;
};
/**
 * Singleton class for `require-in-the-middle` and `import-in-the-middle`
 * Allows instrumentation plugins to patch modules with only a single `require` patch
 * WARNING: Because this class will create its own RITM and IITM instance,
 * we should minimize the number of new instances of this class.
 * Multiple instances of `@opentelemetry/instrumentation` (e.g. multiple versions) in a single process
 * will result in multiple instances of RITM/ITTM, which will have an impact
 * on the performance of instrumentation hooks being applied.
 */
export declare class RequireInTheMiddleSingleton {
    private _moduleNameTrie;
    private static _instance?;
    private constructor();
    private _initialize;
    /**
     * Register a hook with `require-in-the-middle`
     *
     * @param {string} moduleName Module name
     * @param {RequireInTheMiddle.OnRequireFn} onRequire Hook function
     * @returns {Hooked} Registered hook
     */
    register(moduleName: string, onRequire: RequireInTheMiddle.OnRequireFn): Hooked;
    /**
     * Get the `RequireInTheMiddleSingleton` singleton
     *
     * @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
     */
    static getInstance(): RequireInTheMiddleSingleton;
}
//# sourceMappingURL=RequireInTheMiddleSingleton.d.ts.map
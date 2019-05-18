/**
 * Vuex-ORM-Apollo Debug Logger.
 * Wraps console and only logs if enabled.
 *
 * Also contains some methods to format graphql queries for the output
 */
export default class Logger {
    /**
     * Tells if any logging should happen
     * @type {boolean}
     */
    private readonly enabled;
    /**
     * Fancy Vuex-ORM-ReST prefix for all log messages.
     * @type {string[]}
     */
    private readonly PREFIX;
    /**
     * @constructor
     * @param {boolean} enabled Tells if any logging should happen
     */
    constructor(enabled: boolean);
    /**
     * Wraps console.group. In TEST env console.log is used instead because console.group doesn't work on CLI.
     * If available console.groupCollapsed will be used instead.
     * @param {Array<any>} messages
     */
    group(...messages: any[]): void;
    /**
     * Wrapper for console.groupEnd. In TEST env nothing happens because console.groupEnd doesn't work on CLI.
     */
    groupEnd(): void;
    /**
     * Wrapper for console.log.
     * @param {Array<any>} messages
     */
    log(...messages: any[]): void;
    /**
     * Wrapper for console.warn.
     * @param {Array<any>} messages
     */
    warn(...messages: any[]): void;
}

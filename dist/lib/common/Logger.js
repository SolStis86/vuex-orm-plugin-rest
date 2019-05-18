"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vuex-ORM-Apollo Debug Logger.
 * Wraps console and only logs if enabled.
 *
 * Also contains some methods to format graphql queries for the output
 */
var Logger = /** @class */ (function () {
    /**
     * @constructor
     * @param {boolean} enabled Tells if any logging should happen
     */
    function Logger(enabled) {
        /**
         * Fancy Vuex-ORM-ReST prefix for all log messages.
         * @type {string[]}
         */
        this.PREFIX = [
            '%c Vuex-ORM-ReST: ReST Plugin %c',
            'background: #35495e; padding: 1px 0; border-radius: 3px; color: #eee;',
            'background: transparent;',
        ];
        this.enabled = enabled;
        this.log('Logging is enabled.');
    }
    /**
     * Wraps console.group. In TEST env console.log is used instead because console.group doesn't work on CLI.
     * If available console.groupCollapsed will be used instead.
     * @param {Array<any>} messages
     */
    Logger.prototype.group = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            if (console.groupCollapsed) {
                console.groupCollapsed.apply(console, this.PREFIX.concat(messages));
            }
            else {
                console.log.apply(console, this.PREFIX.concat(messages));
            }
        }
    };
    /**
     * Wrapper for console.groupEnd. In TEST env nothing happens because console.groupEnd doesn't work on CLI.
     */
    Logger.prototype.groupEnd = function () {
        if (this.enabled && console.groupEnd) {
            console.groupEnd();
        }
    };
    /**
     * Wrapper for console.log.
     * @param {Array<any>} messages
     */
    Logger.prototype.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            console.log.apply(console, this.PREFIX.concat(messages));
        }
    };
    /**
     * Wrapper for console.warn.
     * @param {Array<any>} messages
     */
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.enabled) {
            console.warn.apply(console, this.PREFIX.concat(messages));
        }
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=Logger.js.map
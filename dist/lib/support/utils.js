"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
// @ts-ignore
var lodash_clone_1 = __importDefault(require("lodash.clone"));
// @ts-ignore
var pluralize_1 = __importDefault(require("pluralize"));
exports.pluralize = pluralize_1.default.plural;
exports.singularize = pluralize_1.default.singular;
/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function upcaseFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
exports.upcaseFirstLetter = upcaseFirstLetter;
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
function downcaseFirstLetter(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
exports.downcaseFirstLetter = downcaseFirstLetter;
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} obj - Value to check.
 */
function isPlainObject(obj) {
    // Basic check for Type object that's not null
    return obj !== null && typeof obj === 'object';
}
exports.isPlainObject = isPlainObject;
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
function pick(object, props) {
    if (!object) {
        return {};
    }
    var index = -1;
    var length = props.length;
    var result = new Map();
    while (++index < length) {
        var prop = props[index];
        result.set(prop, object[prop]);
    }
    return result;
}
exports.pick = pick;
function isEqual(a, b) {
    // Couldn' find a simpler working implementation yet.
    return lodash_isequal_1.default(a, b);
}
exports.isEqual = isEqual;
function clone(input) {
    // Couldn' find a simpler working implementation yet.
    return lodash_clone_1.default(input);
}
exports.clone = clone;
function takeWhile(array, predicate) {
    var index = -1;
    while (++index < array.length && predicate(array[index], index, array)) {
        // just increase index
    }
    return array.slice(0, index);
}
exports.takeWhile = takeWhile;
function matches(source) {
    source = clone(source);
    return function (object) { return isEqual(object, source); };
}
exports.matches = matches;
function removeSymbols(input) {
    return JSON.parse(JSON.stringify(input));
}
exports.removeSymbols = removeSymbols;
//# sourceMappingURL=utils.js.map
export declare const pluralize: any;
export declare const singularize: any;
/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export declare function upcaseFirstLetter(input: string): string;
/**
 * Down cases the first letter of the given string.
 *
 * @param {string} input
 * @returns {string}
 */
export declare function downcaseFirstLetter(input: string): string;
/**
 * Tells if a object is just a simple object.
 *
 * @param {any} obj - Value to check.
 */
export declare function isPlainObject(obj: any): boolean;
/**
 * Creates an object composed of the picked `object` properties.
 * @param {object} object - Object.
 * @param {array} props - Properties to pick.
 */
export declare function pick(object: any, props: string[]): {};
export declare function isEqual(a: object, b: object): boolean;
export declare function clone(input: any): any;
export declare function takeWhile(array: any[], predicate: (x: any, idx: number, array: any[]) => any): any[];
export declare function matches(source: any): (object: any) => boolean;
export declare function removeSymbols(input: any): any;

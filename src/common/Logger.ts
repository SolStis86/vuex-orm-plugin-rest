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
  private readonly enabled: boolean;

  /**
   * Fancy Vuex-ORM-ReST prefix for all log messages.
   * @type {string[]}
   */
  private readonly PREFIX = [
    '%c Vuex-ORM-ReST: ReST Plugin %c',
    'background: #35495e; padding: 1px 0; border-radius: 3px; color: #eee;',
    'background: transparent;',
  ];

  /**
   * @constructor
   * @param {boolean} enabled Tells if any logging should happen
   */
  public constructor(enabled: boolean) {
    this.enabled = enabled;
    this.log('Logging is enabled.');
  }

  /**
   * Wraps console.group. In TEST env console.log is used instead because console.group doesn't work on CLI.
   * If available console.groupCollapsed will be used instead.
   * @param {Array<any>} messages
   */
  public group(...messages: any[]): void {
    if (this.enabled) {
      if (console.groupCollapsed) {
        console.groupCollapsed(...this.PREFIX, ...messages);
      } else {
        console.log(...this.PREFIX, ...messages);
      }
    }
  }

  /**
   * Wrapper for console.groupEnd. In TEST env nothing happens because console.groupEnd doesn't work on CLI.
   */
  public groupEnd(): void {
    if (this.enabled && console.groupEnd) { console.groupEnd(); }
  }

  /**
   * Wrapper for console.log.
   * @param {Array<any>} messages
   */
  public log(...messages: any[]): void {
    if (this.enabled) {
      console.log(...this.PREFIX, ...messages);
    }
  }

  /**
   * Wrapper for console.warn.
   * @param {Array<any>} messages
   */
  public warn(...messages: any[]): void {
    if (this.enabled) {
      console.warn(...this.PREFIX, ...messages);
    }
  }
}

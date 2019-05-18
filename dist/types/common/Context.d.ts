import { Components } from '@vuex-orm/core/lib/plugins/use';
import { AxiosInstance } from 'axios';
import Database from '@vuex-orm/core/lib/database/Database';
import { Options } from '../support/interfaces';
import Model from '../orm/Model';
import Logger from './Logger';
export default class Context {
    /**
     * Contains singleton instance
     * @type {Context}
     */
    static instance: Context;
    /**
     * Get singleton instance of context
     * @returns {Context}
     */
    static getInstance(): Context;
    static setup(components: Components, options: Options): Context;
    /**
     * Components collection of Vuex-ORM
     * @type {Components}
     */
    readonly components: Components;
    /**
     * The options which have been passed to VuexOrm.install
     * @type {Options}
     */
    readonly options: Options;
    /**
     * The Vuex-ORM database
     * @type {Database}
     */
    readonly database: Database;
    /**
     * Axios http instance
     * @type {AxiosInstance}
     */
    axios: AxiosInstance;
    /**
     * Collection of all Vuex-ORM models wrapped in a Model instance.
     * @type {Map<string, Model>}
     */
    readonly models: Map<string, Model>;
    /**
     * Our nice Vuex-ORM-ReST logger
     * @type {Logger}
     */
    readonly logger: Logger;
    /**
     * When true, the logging is enabled.
     * @type {boolean}
     */
    readonly debugMode: boolean;
    private constructor();
    /**
     * Returns a model from the model collection by it's name
     *
     * @param {Model|string} model A Model instance, a singular or plural name of the model
     * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
     *                            found. Default is false
     * @returns {Model}
     */
    getModel(model: Model | string, allowNull?: boolean): Model;
    private collectModels;
}

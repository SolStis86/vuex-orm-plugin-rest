import { Components } from '@vuex-orm/core/lib/plugins/use';
import axios, { AxiosInstance } from 'axios';
import Database from '@vuex-orm/core/lib/database/Database';
import { Options } from '../support/interfaces';
import Model from '../orm/Model';
import Logger from './Logger';
import { singularize, downcaseFirstLetter } from '../support/utils';

export default class Context {
  /**
   * Contains singleton instance
   * @type {Context}
   */
  public static instance: Context;

  /**
   * Get singleton instance of context
   * @returns {Context}
   */
  public static getInstance(): Context {
    return this.instance;
  }

  public static setup(components: Components, options: Options): Context {
    this.instance = new Context(components, options);

    const { baseURL, headers } = options;

    this.instance.axios = axios.create({
      baseURL,
      headers,
    });

    this.instance.collectModels();

    this.instance.logger.group('Context setup');
    this.instance.logger.log('components', this.instance.components);
    this.instance.logger.log('options', this.instance.options);
    this.instance.logger.log('database', this.instance.database);
    this.instance.logger.log('models', this.instance.models);
    this.instance.logger.groupEnd();

    return this.instance;
  }

  /**
   * Components collection of Vuex-ORM
   * @type {Components}
   */
  public readonly components: Components;

  /**
   * The options which have been passed to VuexOrm.install
   * @type {Options}
   */
  public readonly options: Options;

  /**
   * The Vuex-ORM database
   * @type {Database}
   */
  public readonly database: Database;

  /**
   * Axios http instance
   * @type {AxiosInstance}
   */
  public axios!: AxiosInstance;

  /**
   * Collection of all Vuex-ORM models wrapped in a Model instance.
   * @type {Map<string, Model>}
   */
  public readonly models: Map<string, Model> = new Map();

  /**
   * Our nice Vuex-ORM-ReST logger
   * @type {Logger}
   */
  public readonly logger: Logger;

  /**
   * When true, the logging is enabled.
   * @type {boolean}
   */
  public readonly debugMode: boolean = false;

  private constructor(components: Components, options: Options) {
    this.components = components;
    this.options = options;

    this.database = options.database;
    this.debugMode = Boolean(options.debug);
    this.logger = new Logger(this.debugMode);

    if (!options.database) {
      throw new Error('database param is required to initialize vuex-orm-rest!');
    }
  }

  /**
   * Returns a model from the model collection by it's name
   *
   * @param {Model|string} model A Model instance, a singular or plural name of the model
   * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
   *                            found. Default is false
   * @returns {Model}
   */
  public getModel(model: Model | string, allowNull: boolean = false): Model {
    if (typeof model === 'string') {
      const name: string = singularize(downcaseFirstLetter(model));
      model = this.models.get(name) as Model;
      if (!allowNull && !model) {
        throw new Error(`No such model ${name}!`);
      }
    }

    return model;
  }

  private collectModels() {
    this.database.entities.forEach((entity: any) => {
      const model: Model = new Model(entity.model);
      this.models.set(model.singularName, model);
      Model.augment(model);
    });
  }
}

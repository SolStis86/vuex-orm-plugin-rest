"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Model_1 = __importDefault(require("../orm/Model"));
var Logger_1 = __importDefault(require("./Logger"));
var utils_1 = require("../support/utils");
var Context = /** @class */ (function () {
    function Context(components, options) {
        /**
         * Collection of all Vuex-ORM models wrapped in a Model instance.
         * @type {Map<string, Model>}
         */
        this.models = new Map();
        /**
         * When true, the logging is enabled.
         * @type {boolean}
         */
        this.debugMode = false;
        this.components = components;
        this.options = options;
        this.database = options.database;
        this.debugMode = Boolean(options.debug);
        this.logger = new Logger_1.default(this.debugMode);
        if (!options.database) {
            throw new Error('database param is required to initialize vuex-orm-rest!');
        }
    }
    /**
     * Get singleton instance of context
     * @returns {Context}
     */
    Context.getInstance = function () {
        return this.instance;
    };
    Context.setup = function (components, options) {
        this.instance = new Context(components, options);
        var baseURL = options.baseURL, headers = options.headers;
        this.instance.axios = axios_1.default.create({
            baseURL: baseURL,
            headers: headers,
        });
        this.instance.collectModels();
        this.instance.logger.group('Context setup');
        this.instance.logger.log('components', this.instance.components);
        this.instance.logger.log('options', this.instance.options);
        this.instance.logger.log('database', this.instance.database);
        this.instance.logger.log('models', this.instance.models);
        this.instance.logger.groupEnd();
        return this.instance;
    };
    /**
     * Returns a model from the model collection by it's name
     *
     * @param {Model|string} model A Model instance, a singular or plural name of the model
     * @param {boolean} allowNull When true this method returns null instead of throwing an exception when no model was
     *                            found. Default is false
     * @returns {Model}
     */
    Context.prototype.getModel = function (model, allowNull) {
        if (allowNull === void 0) { allowNull = false; }
        if (typeof model === 'string') {
            var name_1 = utils_1.singularize(utils_1.downcaseFirstLetter(model));
            model = this.models.get(name_1);
            if (!allowNull && !model) {
                throw new Error("No such model " + name_1 + "!");
            }
        }
        return model;
    };
    Context.prototype.collectModels = function () {
        var _this = this;
        this.database.entities.forEach(function (entity) {
            var model = new Model_1.default(entity.model);
            _this.models.set(model.singularName, model);
            Model_1.default.augment(model);
        });
    };
    return Context;
}());
exports.default = Context;
//# sourceMappingURL=Context.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VuexORMReST_1 = __importDefault(require("./VuexORMReST"));
/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
var VuexORMReSTPlugin = /** @class */ (function () {
    function VuexORMReSTPlugin() {
    }
    /**
     * This is called, when VuexORM.install(VuexOrmGraphQL, options) is called.
     *
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {VuexORMGraphQL}
     */
    VuexORMReSTPlugin.install = function (components, options) {
        VuexORMReSTPlugin.instance = new VuexORMReST_1.default(components, options);
        return VuexORMReSTPlugin.instance;
    };
    return VuexORMReSTPlugin;
}());
exports.default = VuexORMReSTPlugin;
//# sourceMappingURL=plugin.js.map
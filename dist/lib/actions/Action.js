"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = __importDefault(require("../common/Context"));
var Action = /** @class */ (function () {
    function Action() {
    }
    Action.$request = function (type, endpoint, data) {
        if (data === void 0) { data = {}; }
        return this.context.axios({
            method: type,
            url: endpoint,
            data: data,
        });
    };
    Action.getModelFromState = function (state) {
        return this.context.getModel(state.$name);
    };
    Action.context = Context_1.default.getInstance();
    return Action;
}());
exports.default = Action;
//# sourceMappingURL=Action.js.map
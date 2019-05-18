"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../support/utils");
var Context_1 = __importDefault(require("../common/Context"));
var Model = /** @class */ (function () {
    function Model(baseModel) {
        var _this = this;
        /**
         * Model fields
         * @type {Map<string, Field>}
         */
        this.fields = new Map();
        this.baseModel = baseModel;
        this.pluralName = utils_1.pluralize(this.baseModel.entity);
        this.singularName = utils_1.singularize(this.baseModel.entity);
        var fields = this.baseModel.fields();
        Object.keys(fields).forEach(function (name) {
            _this.fields.set(name, fields[name]);
        });
    }
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isFieldAttribute = function (field) {
        var context = Context_1.default.getInstance();
        return (field instanceof context.components.Increment ||
            field instanceof context.components.Attr ||
            field instanceof context.components.String ||
            field instanceof context.components.Number ||
            field instanceof context.components.Boolean);
    };
    /**
     * Tells if a field which represents a relation is a connection (multiple).
     * @param {Field} field
     * @returns {boolean}
     */
    Model.isConnection = function (field) {
        var context = Context_1.default.getInstance();
        return !(field instanceof context.components.BelongsTo ||
            field instanceof context.components.HasOne ||
            field instanceof context.components.MorphTo ||
            field instanceof context.components.MorphOne);
    };
    /**
     * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
     * @todo is this a good way to add fields?
     * @param {Model} model
     */
    Model.augment = function (model) {
        var originalFieldGenerator = model.baseModel.fields.bind(model.baseModel);
        model.baseModel.fields = function () {
            var originalFields = originalFieldGenerator();
            originalFields.$isPersisted = model.baseModel.boolean(false);
            return originalFields;
        };
    };
    /**
     * @returns {Map<string, Field>} all relations of the model which should be included in a graphql query
     */
    Model.prototype.getRelations = function () {
        var relations = new Map();
        this.fields.forEach(function (field, name) {
            if (!Model.isFieldAttribute(field)) {
                relations.set(name, field);
            }
        });
        return relations;
    };
    /**
     * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
     * of a polymorphic relation.
     * @param {string} name
     * @returns {boolean}
     */
    Model.prototype.isTypeFieldOfPolymorphicRelation = function (name) {
        var _this = this;
        var context = Context_1.default.getInstance();
        var found = false;
        context.models.forEach(function (model) {
            if (found) {
                return false;
            }
            model.getRelations().forEach(function (relation) {
                if (relation instanceof context.components.MorphMany ||
                    relation instanceof context.components.MorphedByMany ||
                    relation instanceof context.components.MorphOne ||
                    relation instanceof context.components.MorphTo ||
                    relation instanceof context.components.MorphToMany) {
                    if (relation.type === name &&
                        relation.related &&
                        relation.related.entity === _this.baseModel.entity) {
                        found = true;
                        return false;
                    }
                }
                return true;
            });
            return true;
        });
        return found;
    };
    /**
     * Returns a record of this model with the given ID.
     * @param {number} id
     * @returns {any}
     */
    Model.prototype.getRecordWithId = function (id) {
        return this.baseModel
            .query()
            .withAllRecursive()
            .where('id', id)
            .first();
    };
    /**
     * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
     * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Field} field Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    Model.prototype.shouldEagerLoadRelation = function (fieldName, field, relatedModel) {
        var context = Context_1.default.getInstance();
        if (field instanceof context.components.HasOne ||
            field instanceof context.components.BelongsTo ||
            field instanceof context.components.MorphOne) {
            return true;
        }
        var eagerLoadList = this.baseModel.eagerLoad || [];
        return (eagerLoadList.find(function (n) {
            return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
        }) !== undefined);
    };
    return Model;
}());
exports.default = Model;
//# sourceMappingURL=Model.js.map
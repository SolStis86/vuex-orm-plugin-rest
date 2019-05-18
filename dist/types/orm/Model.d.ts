import { Model as ORMModel } from '@vuex-orm/core';
import { Field, PatchedModel } from '../support/interfaces';
export default class Model {
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    static isFieldAttribute(field: Field): boolean;
    /**
     * Tells if a field which represents a relation is a connection (multiple).
     * @param {Field} field
     * @returns {boolean}
     */
    static isConnection(field: Field): boolean;
    /**
     * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
     * @todo is this a good way to add fields?
     * @param {Model} model
     */
    static augment(model: Model): void;
    /**
     * The singular name of a model like `blogPost`
     * @type {string}
     */
    readonly singularName: string;
    /**
     * The plural name of a model like `blogPosts`
     * @type {string}
     */
    readonly pluralName: string;
    /**
     * Model fields
     * @type {Map<string, Field>}
     */
    readonly fields: Map<string, Field>;
    /**
     * The original Vuex-ORM model
     */
    readonly baseModel: typeof PatchedModel;
    constructor(baseModel: typeof ORMModel);
    /**
     * @returns {Map<string, Field>} all relations of the model which should be included in a graphql query
     */
    getRelations(): Map<string, Field>;
    /**
     * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
     * of a polymorphic relation.
     * @param {string} name
     * @returns {boolean}
     */
    isTypeFieldOfPolymorphicRelation(name: string): boolean;
    /**
     * Returns a record of this model with the given ID.
     * @param {number} id
     * @returns {any}
     */
    getRecordWithId(id: number): any;
    /**
     * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
     * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
     *
     * @param {string} fieldName Name of the field
     * @param {Field} field Relation field
     * @param {Model} relatedModel Related model
     * @returns {boolean}
     */
    shouldEagerLoadRelation(fieldName: string, field: Field, relatedModel: Model): boolean;
}

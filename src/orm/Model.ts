import { Model as ORMModel } from '@vuex-orm/core';
import { pluralize, singularize } from '../support/utils';
import { Field, PatchedModel } from '../support/interfaces';
import Context from '../common/Context';

export default class Model {

  /**
   * Tells if a field is a attribute (and thus not a relation)
   * @param {Field} field
   * @returns {boolean}
   */
  public static isFieldAttribute(field: Field): boolean {
    const context = Context.getInstance();

    return (
      field instanceof context.components.Increment ||
      field instanceof context.components.Attr ||
      field instanceof context.components.String ||
      field instanceof context.components.Number ||
      field instanceof context.components.Boolean
    );
  }

  /**
   * Tells if a field which represents a relation is a connection (multiple).
   * @param {Field} field
   * @returns {boolean}
   */
  public static isConnection(field: Field): boolean {
    const context = Context.getInstance();

    return !(
      field instanceof context.components.BelongsTo ||
      field instanceof context.components.HasOne ||
      field instanceof context.components.MorphTo ||
      field instanceof context.components.MorphOne
    );
  }

  /**
   * Adds $isPersisted and other meta fields to the model by overwriting the fields() method.
   * @todo is this a good way to add fields?
   * @param {Model} model
   */
  public static augment(model: Model) {
    const originalFieldGenerator = model.baseModel.fields.bind(model.baseModel);

    model.baseModel.fields = () => {
      const originalFields = originalFieldGenerator();

      originalFields.$isPersisted = model.baseModel.boolean(false);

      return originalFields;
    };
  }

  /**
   * The singular name of a model like `blogPost`
   * @type {string}
   */
  public readonly singularName: string;

  /**
   * The plural name of a model like `blogPosts`
   * @type {string}
   */
  public readonly pluralName: string;

  /**
   * Model fields
   * @type {Map<string, Field>}
   */
  public readonly fields: Map<string, Field> = new Map<string, Field>();

  /**
   * The original Vuex-ORM model
   */
  public readonly baseModel: typeof PatchedModel;

  public constructor(baseModel: typeof ORMModel) {
    this.baseModel = baseModel as typeof PatchedModel;

    this.pluralName = pluralize(this.baseModel.entity);
    this.singularName = singularize(this.baseModel.entity);

    const fields = this.baseModel.fields();
    Object.keys(fields).forEach((name: string) => {
      this.fields.set(name, fields[name] as Field);
    });
  }

  /**
   * @returns {Map<string, Field>} all relations of the model which should be included in a graphql query
   */
  public getRelations(): Map<string, Field> {
    const relations = new Map<string, Field>();

    this.fields.forEach((field: Field, name: string) => {
      if (!Model.isFieldAttribute(field)) {
        relations.set(name, field);
      }
    });

    return relations;
  }

  /**
   * This accepts a field like `subjectType` and checks if this is just randomly named `...Type` or it is part
   * of a polymorphic relation.
   * @param {string} name
   * @returns {boolean}
   */
  public isTypeFieldOfPolymorphicRelation(name: string): boolean {
    const context = Context.getInstance();
    let found: boolean = false;

    context.models.forEach((model) => {
      if (found) { return false; }

      model.getRelations().forEach((relation) => {
        if (
          relation instanceof context.components.MorphMany ||
          relation instanceof context.components.MorphedByMany ||
          relation instanceof context.components.MorphOne ||
          relation instanceof context.components.MorphTo ||
          relation instanceof context.components.MorphToMany
        ) {
          if (
            relation.type === name &&
            relation.related &&
            relation.related.entity === this.baseModel.entity
          ) {
            found = true;
            return false;
          }
        }

        return true;
      });

      return true;
    });

    return found;
  }

  /**
   * Returns a record of this model with the given ID.
   * @param {number} id
   * @returns {any}
   */
  public getRecordWithId(id: number): any {
    return this.baseModel
      .query()
      .withAllRecursive()
      .where('id', id)
      .first();
  }

  /**
   * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
   * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
   *
   * @param {string} fieldName Name of the field
   * @param {Field} field Relation field
   * @param {Model} relatedModel Related model
   * @returns {boolean}
   */
  public shouldEagerLoadRelation(fieldName: string, field: Field, relatedModel: Model): boolean {
    const context = Context.getInstance();

    if (
      field instanceof context.components.HasOne ||
      field instanceof context.components.BelongsTo ||
      field instanceof context.components.MorphOne
    ) {
      return true;
    }

    const eagerLoadList: string[] = this.baseModel.eagerLoad || [];
    return (
      eagerLoadList.find((n) => {
        return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
      }) !== undefined
    );
  }
}

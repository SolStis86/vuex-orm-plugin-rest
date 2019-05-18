import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Options, PatchedModel } from './support/interfaces';
import Context from './common/Context';
import Fetch from './actions/Fetch';
import Persist from './actions/Persist';
import Put from './actions/Put';
import Destroy from './actions/Destroy';
import FetchAll from './actions/FetchAll';
import {isPlainObject} from './support/utils';

export default class VuexORMReST {

  /**
   * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
   */
  private static setupActions() {
    const context = Context.getInstance();

    context.components.Actions.fetchAll = FetchAll.call.bind(FetchAll);
    context.components.Actions.fetch = Fetch.call.bind(Fetch);
    context.components.Actions.persist = Persist.call.bind(Persist);
    // context.components.Actions.update = Put.call.bind(Put);
    context.components.Actions.destroy = Destroy.call.bind(Destroy);
  }

  /**
   * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
   * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
   */
  private static setupModelMethods() {
    const context = Context.getInstance();

    // Register static model convenience methods
    (context.components.Model as typeof PatchedModel).fetch = async function (
      filter: any,
      bypassCache = false,
    ) {
      let filterObj = filter;
      if (!isPlainObject(filterObj)) {
        filterObj = {id: filter};
      }
      return this.dispatch('fetch', {filter: filterObj, bypassCache});
    };

    (context.components.Model as typeof PatchedModel).fetchAll = async function (
      filter: any,
      bypassCache = false,
    ) {
      let filterObj = filter;
      if (!isPlainObject(filterObj)) {
        filterObj = {id: filter};
      }
      return this.dispatch('fetchAll', {filter: filterObj, bypassCache});
    };

    // Register model convenience methods
    const model: PatchedModel = context.components.Model.prototype as PatchedModel;

    model.$persist = async function (args: any) {
      return this.$dispatch('persist', {id: this.$id, args});
    };

    model.$put = async function (args: any) {
      return this.$dispatch('put', {data: this, args});
    };

    model.$destroy = async function () {
      return this.$dispatch('destroy', {id: this.$id});
    };

    model.$deleteAndDestroy = async function () {
      await this.$delete();
      return this.$destroy();
    };
  }

  public constructor(components: Components, options: Options) {
    Context.setup(components, options);
    VuexORMReST.setupActions();
    VuexORMReST.setupModelMethods();
  }

  /**
   * Allow everything to read the context.
   */
  public getContext(): Context {
    return Context.getInstance();
  }
}

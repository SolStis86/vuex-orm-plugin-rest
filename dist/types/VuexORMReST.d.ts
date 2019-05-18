import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Options } from './support/interfaces';
import Context from './common/Context';
export default class VuexORMReST {
    /**
     * This method will setup following Vuex actions: fetch, persist, push, destroy, mutate
     */
    private static setupActions;
    /**
     * This method will setup following model methods: Model.fetch, Model.mutate, Model.customQuery, record.$mutate,
     * record.$persist, record.$push, record.$destroy and record.$deleteAndDestroy, record.$customQuery
     */
    private static setupModelMethods;
    constructor(components: Components, options: Options);
    /**
     * Allow everything to read the context.
     */
    getContext(): Context;
}

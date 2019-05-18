import VuexORMReST from './VuexORMReST';
import { Components, Plugin } from '@vuex-orm/core/lib/plugins/use';
import { Options } from './support/interfaces';

/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
export default class VuexORMReSTPlugin implements Plugin {
  /**
   * Contains the instance of VuexORMGraphQL
   */
  public static instance: VuexORMReST;

  /**
   * This is called, when VuexORM.install(VuexOrmGraphQL, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexORMGraphQL}
   */
  public static install(components: Components, options: Options): VuexORMReST {
    VuexORMReSTPlugin.instance = new VuexORMReST(components, options);
    return VuexORMReSTPlugin.instance;
  }
}

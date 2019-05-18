import RootState from '@vuex-orm/core/lib/modules/contracts/RootState';
import Context from '../common/Context';
import { Data, DispatchFunction, RequestTypes } from '../support/interfaces';
import Model from '../orm/Model';
import {AxiosResponse} from 'axios';

export default class Action {
  public static context: Context = Context.getInstance();

  protected static $request(
    type: RequestTypes,
    endpoint: string,
    data: Data = {} as Data
  ): Promise<AxiosResponse> {
    return this.context.axios({
      method: type,
      url: endpoint,
      data,
    });
  }

  protected static getModelFromState(state: RootState): Model {
    return this.context.getModel(state.$name);
  }
}

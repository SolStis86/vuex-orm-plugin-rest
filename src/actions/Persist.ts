import Action from './Action';
import {ActionParams, Data, RequestTypes} from '../support/interfaces';
import {Store} from '../orm/Store';

export default class Persist extends Action {
  public static async call(
    { state, dispatch }: ActionParams,
    payload: Data,
    params?: ActionParams,
  ): Promise<Data> {
    const model = this.getModelFromState(state!);

    const response = await this.$request(
      RequestTypes.POST,
      model.baseModel.REST_ENDPOINT,
      payload,
    );

    return Store.insertData(response.data, dispatch);
  }
}

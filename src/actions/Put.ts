import Action from './Action';
import { ActionParams, Data, RequestTypes } from '../support/interfaces';
import { Store } from '../orm/Store';

export default class Put extends Action {
  public static async call(
    { state, dispatch }: ActionParams,
    id: number | string,
    payload: Data,
    params?: ActionParams,
  ): Promise<Data> {
    const model = this.getModelFromState(state!);

    const response = await this.$request(
      RequestTypes.PUT,
      `${model.baseModel.REST_ENDPOINT}/${id}`,
      payload,
    );

    return Store.insertData(response.data, dispatch);
  }
}

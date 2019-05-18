import Action from './Action';
import {ActionParams, Data, RequestTypes} from '../support/interfaces';
import {Store} from '../orm/Store';

export default class Destroy extends Action {
  public static async call(
    { state, dispatch }: ActionParams,
    id: number | string,
    params?: ActionParams,
  ): Promise<Data> {
    const model = this.getModelFromState(state!);

    const response = await this.$request(
      RequestTypes.DELETE,
      `${model.baseModel.REST_ENDPOINT}/${id}`,
    );

    return Store.insertData(response.data, dispatch);
  }
}

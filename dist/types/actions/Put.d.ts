import Action from './Action';
import { ActionParams, Data } from '../support/interfaces';
export default class Put extends Action {
    static call({ state, dispatch }: ActionParams, id: number | string, payload: Data, params?: ActionParams): Promise<Data>;
}

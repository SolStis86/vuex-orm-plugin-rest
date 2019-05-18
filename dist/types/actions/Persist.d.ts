import Action from './Action';
import { ActionParams, Data } from '../support/interfaces';
export default class Persist extends Action {
    static call({ state, dispatch }: ActionParams, payload: Data, params?: ActionParams): Promise<Data>;
}

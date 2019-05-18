import Action from './Action';
import { ActionParams, Data } from '../support/interfaces';
export default class FetchAll extends Action {
    static call({ state, dispatch }: ActionParams, params?: ActionParams): Promise<Data>;
}

import Action from './Action';
import { ActionParams, Data } from '../support/interfaces';
export default class Fetch extends Action {
    static call({ state, dispatch }: ActionParams, id: number | string, params?: ActionParams): Promise<Data>;
}

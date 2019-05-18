import RootState from '@vuex-orm/core/lib/modules/contracts/RootState';
import Context from '../common/Context';
import { Data, RequestTypes } from '../support/interfaces';
import Model from '../orm/Model';
import { AxiosResponse } from 'axios';
export default class Action {
    static context: Context;
    protected static $request(type: RequestTypes, endpoint: string, data?: Data): Promise<AxiosResponse>;
    protected static getModelFromState(state: RootState): Model;
}

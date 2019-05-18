import { Database, Model as ORMModel } from '@vuex-orm/core';
import ORMInstance from '@vuex-orm/core/lib/data/Instance';
import RootState from '@vuex-orm/core/lib/modules/contracts/RootState';
export declare type DispatchFunction = (action: string, data: Data) => Promise<any>;
export interface Options {
    database: Database;
    baseURL: string;
    headers: {
        [index: string]: string;
    };
    debug?: boolean;
}
export interface Data extends ORMInstance<PatchedModel> {
    [index: string]: any;
}
export interface Filter {
    [index: string]: any;
}
export interface Arguments {
    [index: string]: any;
}
export interface GraphQLType {
    description: string;
    name: string;
    fields?: GraphQLField[];
    inputFields?: GraphQLField[];
}
export interface GraphQLField {
    description: string;
    name: string;
    args: GraphQLField[];
    type: GraphQLTypeDefinition;
}
export interface GraphQLTypeDefinition {
    kind: string;
    name?: string;
    ofType: GraphQLTypeDefinition;
}
export interface GraphQLSchema {
    types: GraphQLType[];
}
export interface Field {
    related?: typeof ORMModel;
    parent?: typeof ORMModel;
    localKey?: string;
    foreignKey?: string;
}
export interface ActionParams {
    commit?: any;
    dispatch: DispatchFunction;
    getters?: any;
    rootGetters?: any;
    rootState?: any;
    state?: RootState;
    filter?: Filter;
    id?: number;
    data?: Data;
    args?: Arguments;
    variables?: Arguments;
    bypassCache?: boolean;
    endpoint?: string;
    multiple?: boolean;
    name?: string;
}
export declare enum RequestTypes {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS"
}
export declare class PatchedModel extends ORMModel {
    static REST_ENDPOINT: string;
    static eagerLoad?: string[];
    static eagerSave?: string[];
    static eagerSync?: string[];
    static skipFields?: string[];
    static fetchAll(filter?: any, bypassCache?: boolean): Promise<any>;
    static fetch(id: number): Promise<any>;
    $isPersisted: boolean;
    $put(params: ActionParams): Promise<any>;
    $persist(args?: any): Promise<any>;
    $destroy(): Promise<any>;
    $deleteAndDestroy(): Promise<any>;
}

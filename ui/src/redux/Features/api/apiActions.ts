import {Action, ActionCreator, createAction, PayloadAction} from '@reduxjs/toolkit';
import {ApiEndpoints} from "./apiEndpoints";

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
interface Headers {
    [key: string]: string;
}
interface Body {
    [key: string]: any;
}
export interface ApiRequestPayload {
    url: ApiEndpoints;
    method:HttpMethod;
    body?: Body;
    onSuccess: ActionCreator<any>;
    onError: ActionCreator<any>;
    headers?: Headers;
}
//EVENT ACTIONS (TRIGGERS)
export const apiRequest = createAction<ApiRequestPayload>('api/apiRequest');
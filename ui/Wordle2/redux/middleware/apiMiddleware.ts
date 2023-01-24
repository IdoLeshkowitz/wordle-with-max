import {Middleware, createAction, PayloadAction} from "@reduxjs/toolkit";

 export interface ApiRequestPayload {
    method: string;
    url: string;
    body: any;
    onSuccess: string;
    onError: string;
}

const apiRequest = createAction<ApiRequestPayload>('api/apiRequest');
export const  apiMiddleware: Middleware = (store) => (next) => (action: PayloadAction<ApiRequestPayload>) => {
    if (action.type === apiRequest.type) {
        fetch(action.payload.url, {method: action.payload.method, body: action.payload.body})

    }
}
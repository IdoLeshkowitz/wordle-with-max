import { Middleware } from '@reduxjs/toolkit';
import { apiRequest } from './apiActions';

const apiMiddleware : Middleware= ({getState, dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === apiRequest.type){
        const {url, method, onSuccess, onError} = action.payload;
        fetch(url, {method})
            .then(response => response.json())
            .then(data => dispatch(onSuccess(data)))
            .catch(error => dispatch(onError(error)));
    }
}

export default [apiMiddleware];
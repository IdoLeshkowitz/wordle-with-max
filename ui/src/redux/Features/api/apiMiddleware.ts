import { Middleware, PayloadAction } from '@reduxjs/toolkit'
import { apiRequest, ApiRequestPayload } from './apiActions'

const apiMiddleware: Middleware = ({ getState, dispatch }) => (next) => (action: PayloadAction<ApiRequestPayload>) => {
    next(action)
    if (action.type === apiRequest.type) {
        if (action.payload.method === 'GET') {
            fetch(action.payload.url)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({ type: action.payload.onSuccess, payload: data })
                })
                .catch((error) => {
                    dispatch({ type: action.payload.onError, payload: error })
                })
        }
        if (action.payload.method === 'POST') {
            const headers = action.payload.headers || {}
            headers['Content-Type'] = 'application/json'
            fetch(action.payload.url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(action.payload.body),
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch({ type: action.payload.onSuccess, payload: data })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch({ type: action.payload.onError, payload: error })
                })
        }
    }
}

export default [apiMiddleware]
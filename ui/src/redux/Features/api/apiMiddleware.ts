import {Middleware, PayloadAction} from '@reduxjs/toolkit'
import {apiRequest, ApiRequestPayload} from './apiActions'
import {closeModal} from "../overlays/overlaysActions";


const apiMiddleware: Middleware = ({
                                       dispatch
                                   }) => (next) => async (action: PayloadAction<ApiRequestPayload>) => {
    next(action)
    if (action.type === apiRequest.type) {
        const {url, method, body, onSuccess, onError, headers} = action.payload
        fetch(
            url, {
            method,
            headers: {
                ...headers
            },
            body: JSON.stringify(body)
        }).then(async(response) => {
            const data = await response.json()
            if (response.status >= 200 && response.status < 300) {
                dispatch(onSuccess(data))
            } else {
                // dispatch({type: onError.toString(), payload: data})
            }
        }).catch((error) => {
            console.log(error)
        })
        //in case of some error
        // dispatch(loginError())
    }
}

export default [apiMiddleware]
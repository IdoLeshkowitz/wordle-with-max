import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import {login, loginError, LoginPayload, loginSuccess, loginWithGoogle} from "./userActions";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {apiRequest} from "../api/apiActions";

const loginWithGoogleSplit: Middleware = ({
                                                     dispatch, getState
                                                 }) => next => (action: PayloadAction<GoogleCredentialResponse>) => {
    next(action);
    if (action.type === loginWithGoogle.type) {
        const id_token = action.payload;
        dispatch(apiRequest({
                                url      : "/auth/loginwithgoogle",
                                method   : "POST",
                                headers  : {'authorization': id_token},
                                onSuccess: "user/loginSuccess",
                                onError  : "user/loginError"

                            }));
    }
}

const loginMW: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<LoginPayload>) => {
    next(action);
    if (action.type === login.type) {
        console.log('login entered')
        const submitted = action.payload;
        console.log(submitted)
    }
}

const loginSuccessSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === loginSuccess.type) {
        const token = action.payload;
        console.log("token: " + token)
        localStorage.setItem("token", token);
    }
}

const loginErrorSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === loginError.type){
        console.log(action.payload)
    }
}

export default [loginWithGoogleSplit, loginSuccessSplit, loginErrorSplit, loginMW];

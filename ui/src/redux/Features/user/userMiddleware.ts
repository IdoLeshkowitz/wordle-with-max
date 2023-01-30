import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import {
    clearCurrentUser,
    login,
    loginError,
    loginSuccess,
    loginWithGoogle,
    logout,
    setCurrentUser
} from "./userActions";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {apiRequest, ApiRequestPayload, HttpMethod} from "../api/apiActions";
import jwtDecode from "jwt-decode";
import {User} from "../../../../../commonTypes/User";
import {ApiEndpoints} from "../api/apiEndpoints";
import {closeModal} from "../overlays/overlaysActions";

const loginWithGoogleSplit: Middleware = ({
                                              dispatch,
                                              getState
                                          }) => next => (action: PayloadAction<GoogleCredentialResponse>) => {
    next(action);
    if (action.type === loginWithGoogle.type) {
        const {credential} = action.payload;
        if (!credential) {
            dispatch(loginError())
        }
        const requestPayload: ApiRequestPayload = {
            method   : HttpMethod.POST,
            url      : ApiEndpoints.LOGIN_WITH_GOOGLE,
            headers  : {'Authorization': credential as string},
            onError  : loginError,
            onSuccess: loginSuccess,
        }
        dispatch(apiRequest(requestPayload))
    }
}

const loginSuccessSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<{ token: string }>) => {
    next(action);
    if (action.type === loginSuccess.type) {
        const {token} = action.payload;
        try {
            dispatch(setCurrentUser(jwtDecode(token) as User))
            dispatch(closeModal())
            localStorage.setItem("token", token);
        } catch (e) {
            dispatch(loginError())
        }
    }
}
const loginSplit: Middleware = ({dispatch, getState}) => next => (action) => {
    next(action)
    if (action.type === login.type) {
        const requestPayload: ApiRequestPayload = {
            method   : HttpMethod.POST,
            url      : ApiEndpoints.LOGIN,
            body     : action.payload,
            onError  : loginError,
            onSuccess: loginSuccess,
            headers  : {
                'Content-Type': 'application/json'
            }
        }
        dispatch(apiRequest(requestPayload))
    }
}
const loginErrorSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === loginError.type) {

    }
}
const logoutSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === logout.type) {
        dispatch(clearCurrentUser())
        localStorage.removeItem("token");
    }
}


export default [loginWithGoogleSplit, loginSuccessSplit, loginErrorSplit, logoutSplit, loginSplit];

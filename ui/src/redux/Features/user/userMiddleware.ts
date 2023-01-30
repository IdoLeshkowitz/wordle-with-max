import {Middleware, PayloadAction} from "@reduxjs/toolkit";
import {
    clearCurrentUser,
    login,
    loginError,
    loginSuccess,
    loginWithGoogle,
    logout,
    setCurrentUser,
    signUp,
    signUpError
} from "./userActions";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {apiRequest, ApiRequestPayload, HttpMethod} from "../api/apiActions";
import jwtDecode from "jwt-decode";
import {User} from "../../../../../commonTypes/User";
import {ApiEndpoints} from "../api/apiEndpoints";
import {closeModal} from "../overlays/overlaysActions";
import {restoreStatus, setStatus} from "../game/gameActions";
import {GameStatus} from "../game/gameSlice";
import {SignUpPayload} from "../../../../../commonTypes/SignupRequestPayload";
import {addError} from "../errors/errorsActions";
import {ErrorType} from "../../../../../commonTypes/Errors";
import {LoginPayload} from "../../../../../commonTypes/LoginRequestPayload";
/*
this middleware intercepts the loginWithGoogle action
    -dispatches a request to the server with the credential from google
    -the server checks the credential and returns a token
    -meanwhile the status is set to pending
 */
const loginWithGoogleSplit: Middleware = ({dispatch,}) => next => (action: PayloadAction<GoogleCredentialResponse>) => {
    next(action);
    if (action.type === loginWithGoogle.type) {
        const {credential} = action.payload;
        if (!credential) {
            dispatch(loginError())
        }
        const requestPayload: ApiRequestPayload = {
            method: HttpMethod.POST,
            url: ApiEndpoints.LOGIN_WITH_GOOGLE,
            headers: {'Authorization': credential as string},
            onError: loginError,
            onSuccess: loginSuccess,
        }
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest(requestPayload))
    }
}
/*
this middleware intercepts the login action
    -dispatches a request to the server with given email and password
    -the server checks the credential and returns a token
    -meanwhile the status is set to pending
 */
const loginSplit: Middleware = ({dispatch, getState}) => next => (action :PayloadAction<LoginPayload>) => {
    next(action)
    if (action.type === login.type) {
        const requestPayload: ApiRequestPayload = {
            method: HttpMethod.POST,
            url: ApiEndpoints.LOGIN,
            body: action.payload,
            onError: loginError,
            onSuccess: loginSuccess,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest(requestPayload))
    }
}
/*
this middleware intercepts the loginSuccess action
    -decodes the token and dispatches setCurrentUser
    -closes the modal
 */
const loginSuccessSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<{ token: string }>) => {
    next(action);
    if (action.type === loginSuccess.type) {
        const {token} = action.payload;
        try {
            dispatch(setCurrentUser(jwtDecode(token) as User))
            // dispatch(restoreStatus())
            dispatch(closeModal())
            localStorage.setItem("token", token);
        } catch (e) {
            dispatch(loginError())
        }
    }
}
/*
this middleware intercepts the loginError action

 */
const loginErrorSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === loginError.type) {
        dispatch(restoreStatus())
        dispatch(addError(ErrorType.LOGIN_ERROR))
    }
}
const signupSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<SignUpPayload>) => {
    next(action)
    if (action.type === signUp.type) {
        const requestPayload: ApiRequestPayload = {
            method: HttpMethod.POST,
            url: ApiEndpoints.SIGNUP,
            onSuccess: loginSuccess,
            onError: signUpError,
            body: action.payload,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch(apiRequest(requestPayload))
        dispatch(setStatus(GameStatus.pending))
    }
}
const signUpErrorSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action)
    if (action.type === signUpError.type) {
        dispatch(restoreStatus())
        dispatch(addError(ErrorType.SIGNUP_ERROR))
    }
}
const logoutSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === logout.type) {
        dispatch(clearCurrentUser())
        localStorage.removeItem("token");
    }
}
export default [loginWithGoogleSplit, loginSuccessSplit, loginErrorSplit, logoutSplit, loginSplit, signupSplit, signUpErrorSplit]

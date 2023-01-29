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
import {apiRequest} from "../api/apiActions";
import jwtDecode from "jwt-decode";
import {User} from "../../../../../commonTypes/User";

const loginWithGoogleSplit: Middleware = ({
                                              dispatch,
                                              getState
                                          }) => next => (action: PayloadAction<GoogleCredentialResponse>) => {
    next(action);
    if (action.type === loginWithGoogle.type) {
        const {credential} = action.payload;
        dispatch(apiRequest({
                                url      : "http://localhost:3000/auth/loginwithgoogle",
                                method   : "POST",
                                headers  : {'Authorization': credential},
                                onSuccess: "user/loginSuccess",
                                onError  : "user/loginError"
                            }));
    }
}

const loginSuccessSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<any>) => {
    next(action);
    if (action.type === loginSuccess.type) {
        const token = action.payload.token;
        const {email, firstName, lastName} = jwtDecode(token) as User;
        const user: User = {email, firstName, lastName};
        dispatch(setCurrentUser(user))
        localStorage.setItem("token", token);
    }
}

const loginSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action)
    if (action.type === login.type){
        dispatch(apiRequest({
            url: "http://localhost:3000/auth/login",
            method: "POST",
            body: action.payload,
            onSuccess: "user/loginSuccess",
            onError: "user/loginError"
        }))
    }
}
const loginErrorSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === loginError.type) {
        console.log(action.payload)
    }
}
const logoutSplit: Middleware = ({dispatch, getState}) => next => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === logout.type) {
        dispatch(clearCurrentUser())
        localStorage.removeItem("token");
    }
}


export default [loginWithGoogleSplit, loginSuccessSplit, loginErrorSplit, logoutSplit,loginSplit];

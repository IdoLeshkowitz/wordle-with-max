import {createAction} from "@reduxjs/toolkit";
import {GoogleCredentialResponse} from "@react-oauth/google";

export interface LoginPayload {
    email : string
    password : string
}
export const login = createAction<object>("user/login");
export const loginWithGoogle = createAction<GoogleCredentialResponse>("user/loginWithGoogle");
export const logout = createAction("user/logout");
export const loginSuccess = createAction<string>("user/loginSuccess");
export const loginError = createAction<string>("user/loginError");

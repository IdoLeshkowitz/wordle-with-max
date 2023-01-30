import {
    Action,
    ActionCreator,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createAction
} from "@reduxjs/toolkit";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {userSlice} from "./userSlice";

interface LoginPayload {
    password: string,
    email: string
}
export const {setCurrentUser, clearCurrentUser} = userSlice.actions;
export const login : ActionCreatorWithPayload<LoginPayload>= createAction<LoginPayload>("user/login");
export const loginWithGoogle : ActionCreatorWithPayload<GoogleCredentialResponse> = createAction<GoogleCredentialResponse>("user/loginWithGoogle");
export const logout = createAction("user/logout");
export const loginSuccess = createAction<string>("user/loginSuccess");
export const loginError = createAction("user/loginError");

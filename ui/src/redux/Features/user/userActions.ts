import {ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {userSlice} from "./userSlice";
import {SignUpPayload} from "../../../../../commonTypes/SignupRequestPayload";
import {LoginPayload} from "../../../../../commonTypes/LoginRequestPayload";


export const {setCurrentUser, clearCurrentUser} = userSlice.actions;
export const login: ActionCreatorWithPayload<LoginPayload> = createAction<LoginPayload>("user/login");
export const loginWithGoogle: ActionCreatorWithPayload<GoogleCredentialResponse> = createAction<GoogleCredentialResponse>("user/loginWithGoogle");
export const logout = createAction("user/logout");
export const loginSuccess = createAction<string>("user/loginSuccess");
export const loginError = createAction("user/loginError");

export const signUp: ActionCreatorWithPayload<SignUpPayload> = createAction<SignUpPayload>("user/signUp");
export const signUpError = createAction("user/signUpError");
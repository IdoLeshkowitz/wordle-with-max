import {createAction} from "@reduxjs/toolkit";
import {GoogleCredentialResponse} from "@react-oauth/google";
import {User} from "../../../../../commonTypes/User";
import {userSlice} from "./userSlice";

export const {setCurrentUser,clearCurrentUser} = userSlice.actions;
export const login = createAction<User>("user/login");
export const loginWithGoogle = createAction<GoogleCredentialResponse>("user/loginWithGoogle");
export const logout = createAction("user/logout");
export const loginSuccess = createAction<string>("user/loginSuccess");
export const loginError = createAction<string>("user/loginError");

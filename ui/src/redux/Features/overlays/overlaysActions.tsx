import {overlaysSlice} from "./overlaysSlice";
import {ActionCreatorWithoutPayload, createAction} from "@reduxjs/toolkit";

export const {removeToast,addToast,setSpinner,openModal,closeModal}= overlaysSlice.actions

export const logInClicked = createAction('overlays/signInClicked')
export const helpClicked = createAction('overlays/helpClicked')
export const signUpClicked = createAction('overlays/signUpClicked')
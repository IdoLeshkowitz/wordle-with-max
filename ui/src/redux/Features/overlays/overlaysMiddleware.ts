import {Middleware} from "@reduxjs/toolkit";
import {restoreStatus, setStatus} from "../game/gameActions";
import {closeModal, helpClicked, logInClicked, openModal, signUpClicked} from "./overlaysActions";
import {ModalType} from "./overlaysSlice";
import {GameStatus} from "../game/gameSlice";
import {RootState} from "../../store";
import {clearError} from "../errors/errorsActions";
import {ErrorType} from "../../../../../commonTypes/Errors";

const closeModalEnricher: Middleware = ({dispatch, getState}) => next => action => {
    if (action.type === closeModal.type) {
        const state: RootState = getState()
        if (!state.overlays.activeModal) {
            return
        }
            next(action);
            dispatch(restoreStatus())
    }
    next(action);
}
const loginClickedEnricher: Middleware = ({dispatch}) => next => action => {
    next(action);
    if (action.type === logInClicked.type) {
        dispatch(clearError(ErrorType.LOGIN_ERROR))
        dispatch(openModal(ModalType.login))
    }
}
const signupClickedEnricher: Middleware = ({dispatch}) => next => action => {
    next(action);
    if (action.type === signUpClicked.type) {
        dispatch(clearError(ErrorType.SIGNUP_ERROR))
        dispatch(openModal(ModalType.signup))
    }
}
const helpClickedEnricher: Middleware = ({dispatch}) => next => action => {
    next(action);
    if (action.type === helpClicked.type) {
        dispatch(openModal(ModalType.help))
    }
}
export const overlaysMiddleware = [closeModalEnricher, loginClickedEnricher, helpClickedEnricher,signupClickedEnricher]
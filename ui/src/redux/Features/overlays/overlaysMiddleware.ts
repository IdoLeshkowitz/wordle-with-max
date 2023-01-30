import {Middleware} from "@reduxjs/toolkit";
import {restoreStatus, setStatus} from "../game/gameActions";
import {closeModal, logInClicked, openModal} from "./overlaysActions";
import {ModalType} from "./overlaysSlice";
import {GameStatus} from "../game/gameSlice";
import {RootState} from "../../store";

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
const signInClickedEnricher: Middleware = ({dispatch}) => next => action => {
    next(action);
    if (action.type === logInClicked.type) {
        // dispatch(setStatus(GameStatus.pending))
        dispatch(openModal(ModalType.login))
    }
}
const helpClickedEnricher: Middleware = ({dispatch}) => next => action => {
    next(action);
    if (action.type === logInClicked.type) {
        dispatch(setStatus(GameStatus.pending))
        dispatch(openModal(ModalType.help))
    }
}

export const overlaysMiddleware = [closeModalEnricher, signInClickedEnricher, helpClickedEnricher]
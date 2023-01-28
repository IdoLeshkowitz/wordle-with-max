import {Middleware} from "@reduxjs/toolkit";
import {restoreStatus, setStatus} from "../game/gameActions";
import {closeModal, openModal} from "./overlaysActions";
import {GameStatus} from "../game/gameSlice";

const closeModalEnricher :Middleware =({dispatch}) => next => action => {
    next(action);
    if(action.type === closeModal.type){
        dispatch(restoreStatus())
    }
}
const openModalEnricher :Middleware =({dispatch}) => next => action => {
    next(action);
    if(action.type === openModal.type){
        dispatch(setStatus(GameStatus.pending))
    }
}

export const overlaysMiddleware = [openModalEnricher, closeModalEnricher]
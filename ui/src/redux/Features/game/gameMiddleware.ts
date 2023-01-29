import {Middleware} from "@reduxjs/toolkit";
import {getSessionError, getSessionSuccess, setSessionId, setStatus, startGame} from "./gameActions";
import {GameStatus} from "./gameSlice";
import {apiRequest} from "../api/apiActions";
import {addToast} from "../overlays/overlaysActions";
import {Toasts} from "../overlays/overlaysSlice";

const startGameSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === startGame.type) {
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest({
                                url      : 'http://localhost:3000/session',
                                method   : 'POST',
                                onSuccess: getSessionSuccess.type,
                                onError  : getSessionError.type
                            }))
    }
}

const getSessionSuccessSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === getSessionSuccess.type) {
        dispatch(setSessionId(action.payload))
        dispatch(setStatus(GameStatus.in_progress))
    }
}

const getSessionErrorSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === getSessionError.type) {
        dispatch(setStatus(GameStatus.error))
        dispatch(addToast(Toasts.CONNECTION_ERROR))
    }
}
export const gameMiddleware = [startGameSplit, getSessionErrorSplit, getSessionSuccessSplit]
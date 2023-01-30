import {Middleware} from "@reduxjs/toolkit";
import {getSessionError, getSessionSuccess, setSessionId, setStatus, startGame} from "./gameActions";
import {GameStatus} from "./gameSlice";
import {apiRequest, ApiRequestPayload, HttpMethod} from "../api/apiActions";
import {addToast} from "../overlays/overlaysActions";
import {Toasts} from "../overlays/overlaysSlice";
import {ApiEndpoints} from "../api/apiEndpoints";

const startGameSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === startGame.type) {
        const requestPayload :ApiRequestPayload = {
            method : HttpMethod.POST,
            url : ApiEndpoints.SESSION,
            onSuccess : getSessionSuccess,
            onError : getSessionError
        }
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest(requestPayload))
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
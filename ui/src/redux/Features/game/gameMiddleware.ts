import {Middleware} from "@reduxjs/toolkit";
import {getSessionError, getSessionSuccess, setSessionId, setStatus, startGame} from "./gameActions";
import {GameStatus} from "./gameSlice";
import {apiRequest, ApiRequestPayload, HttpMethod} from "../api/apiActions";
import {addToast, openModal} from "../overlays/overlaysActions";
import {ModalType, Toasts} from "../overlays/overlaysSlice";
import {ApiEndpoints} from "../api/apiEndpoints";
import {clearAllGuesses} from "../guesses/guessesActions";

const startGameSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === startGame.type) {
        const requestPayload :ApiRequestPayload = {
            method : HttpMethod.POST,
            url : ApiEndpoints.SESSION,
            onSuccess : getSessionSuccess,
            onError : getSessionError
        }
        dispatch(apiRequest(requestPayload))

        dispatch(clearAllGuesses())
    }
}
const endGameEnricher: Middleware = ({dispatch}) => (next) => (action) => {
    next(action)
    if (action.type === setStatus.type) {
        if (action.payload === GameStatus.endedWithLoss || action.payload === GameStatus.endedWithWin) {
            dispatch(openModal(ModalType.gameEnded))
        }
    }
}
const getSessionSuccessSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === getSessionSuccess.type) {
        const {sessionId} = action.payload
        dispatch(setSessionId(sessionId))
        dispatch(setStatus(GameStatus.inProgress))
    }
}
const getSessionErrorSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === getSessionError.type) {
        dispatch(setStatus(GameStatus.error))
        dispatch(addToast(Toasts.CONNECTION_ERROR))
    }
}
export const gameMiddleware = [startGameSplit, getSessionErrorSplit, getSessionSuccessSplit,endGameEnricher]
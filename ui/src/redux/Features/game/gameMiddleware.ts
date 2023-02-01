import {Middleware} from "@reduxjs/toolkit";
import {
    endSessionError,
    endSessionSuccess,
    getSessionError,
    getSessionSuccess,
    setSessionId,
    setStatus,
    setTargetWord,
    startGame
} from "./gameActions";
import {GameStatus} from "./gameSlice";
import {apiRequest, ApiRequestPayload, HttpMethod} from "../api/apiActions";
import {addToast, openModal} from "../overlays/overlaysActions";
import {ModalType, Toasts} from "../overlays/overlaysSlice";
import {ApiEndpoints} from "../api/apiEndpoints";
import {addEvaluatedGuesses, clearAllGuesses} from "../guesses/guessesActions";
import {RootState} from "../../store";
import {Correctness, EvaluatedGuess} from "../../../../../commonTypes/EvaluatedGuess";

const startGameSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === startGame.type) {
        /*
        dispatch an api request to start the session
         */
        const requestPayload: ApiRequestPayload = {
            method: HttpMethod.POST,
            url: ApiEndpoints.SESSION,
            onSuccess: getSessionSuccess,
            onError: getSessionError
        }
        dispatch(apiRequest(requestPayload))
        /*
        clear target word if exists from previous game
         */
        dispatch(setTargetWord(''))
        /*
        clear guesses from previous game
         */
        dispatch(clearAllGuesses())
    }
}
const endGameEnricher: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    if (action.type === setStatus.type) {
        if (action.payload.startsWith('ENDED')) {
            /*
            dispatch an api request to end the session
             */
            const {game: {sessionId}}: RootState = getState()
            const apiRequestPayload: ApiRequestPayload = {
                method: HttpMethod.DELETE,
                url: ApiEndpoints.SESSION,
                onSuccess: endSessionSuccess,
                onError: endSessionError,
                headers: {
                    'sessionId': sessionId
                }
            }
            dispatch(apiRequest(apiRequestPayload))
        }
    }
}
const endSessionSuccessSplit: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action);
    if (action.type === endSessionSuccess.type) {
        const {game: {status}}: RootState = getState()
        if (status === GameStatus.endedWithLoss) {
            const {targetWord} = action.payload
            const returnedTagetWord: EvaluatedGuess[] = targetWord.split('').map((letter: string,index:number) => {
                return {letter,index,correctness:Correctness.correctPlace} as EvaluatedGuess
            })
            dispatch(addEvaluatedGuesses(returnedTagetWord))
            /*
            set target word wait 5 sec and then open the modal
             */
            setTimeout(() => {
                dispatch(openModal(ModalType.gameEnded))
            }, 1000)
            return
        }
        dispatch(openModal(ModalType.gameEnded))
    }
}
const endSessionErrorSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action);
    if (action.type === endSessionError.type) {
        console.log('endSessionErrorSplit')
        console.log(action.payload)
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
export const gameMiddleware = [startGameSplit, getSessionErrorSplit, getSessionSuccessSplit, endGameEnricher, endSessionSuccessSplit]
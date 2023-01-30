import {Middleware, PayloadAction} from '@reduxjs/toolkit'
import {setStatus} from '../game/gameActions'
import {
    addEvaluatedGuesses,
    addNonEvaluatedGuess,
    clearNonEvaluatedGuesses,
    evaluateRow,
    evaluationError,
    evaluationSuccess,
    incomingGuess
} from './guessesActions'
import {RootState} from '../../store'
import {apiRequest, ApiRequestPayload, HttpMethod} from '../api/apiActions'
import {EvaluatedGuess} from '../../../../../commonTypes/EvaluatedGuess'
import {GameStatus} from "../game/gameSlice";
import {ApiEndpoints} from "../api/apiEndpoints";

/*
                                                 HELPER FUNCTIONS
*******************************************************************************************************************
 */
function isGameEnded(state: RootState): boolean {
    const {numberOfColumns, numberOfRows} = state.game.settings
    const completedRows = state.guesses.evaluatedGuesses.length / numberOfColumns
    return completedRows === numberOfRows
}

export function isRowEnded(state: RootState): boolean {
    const {numberOfColumns} = state.game.settings
    const completedGuesses = state.guesses.nonEvaluatedGuesses.length
    return completedGuesses === numberOfColumns
}

/*
                                                   MIDDLEWARES
 *******************************************************************************************************************
 */

/*
 This middleware intercepts incomingGuess event action.
 Checks if there's any guess left for current row and dispatches appropriate action
 */
export const incomingGuessMap: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    if (action.type === incomingGuess.type) {
        dispatch(addNonEvaluatedGuess(action.payload))
        //check if there's any guess left for current row
        if (isRowEnded(getState())) {
            //if no guesses left -> dispatch evaluateRow
            dispatch(evaluateRow())
        }
    }
}

/*
 this middleware intercepts evaluateRow command action,and dispatches a number of actions
 */
const evaluateRowSplit: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    if (action.type === evaluateRow.type) {
        const state: RootState = getState()
        const {nonEvaluatedGuesses: guessesToEvaluate} = state.guesses
        const requestPayload: ApiRequestPayload = {
            method   : HttpMethod.POST,
            url      : ApiEndpoints.EVALUATE,
            onSuccess: evaluationSuccess,
            onError  : evaluationError,
            headers  :
                {
                    'sessionid'   : state.game.sessionId,
                    'Content-Type': 'application/json'
                },
            body     : guessesToEvaluate,
        }
        dispatch(clearNonEvaluatedGuesses())
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest(requestPayload))
    }
}

/*
 this middleware intercepts evaluationSuccess event action and dispatches appropriate actions
 */
const evaluationSuccessSplit: Middleware = ({
                                                dispatch,
                                                getState
                                            }) => (next) => (action: PayloadAction<EvaluatedGuess[]>) => {
    next(action)
    if (action.type === evaluationSuccess.type) {
        //set evaluated guesses
        dispatch(addEvaluatedGuesses(action.payload))
        dispatch(setStatus(GameStatus.in_progress))
    }
}

/*
    this middleware intercepts evaluationError event action and dispatches appropriate actions
 */
const evaluationErrorSplit: Middleware = ({dispatch}) => (next) => (action) => {
    next(action)
    if (action.type === evaluationError.type) {
        dispatch(setStatus(GameStatus.error))
    }
}

export const guessesMiddleware = [evaluationSuccessSplit, evaluationErrorSplit, evaluateRowSplit, incomingGuessMap]

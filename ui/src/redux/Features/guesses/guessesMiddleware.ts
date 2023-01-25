import { Middleware } from '@reduxjs/toolkit'
import { GameStatus } from '../game/gameSlice'
import { addNonEvaluatedGuess, clearNonEvaluatedGuesses, evaluateRow, evaluationError, evaluationSuccess, incomingGuess } from './guessesActions'
import { RootState, store } from '../../store'
import { setStatus } from '../game/gameSlice'
import { apiRequest } from '../api/apiActions'
/*
                                                 HELPER FUNCTIONS
*******************************************************************************************************************
 */
function isGameEnded(state: RootState): boolean {
    const { numberOfGuessesInRow, numberOfRows } = state.game.settings
    const completedRows = state.guesses.evaluatedGuesses.length / numberOfGuessesInRow
    return completedRows === numberOfRows
}
export function isRowEnded(state: RootState): boolean {
    const { numberOfGuessesInRow } = state.game.settings
    const completedGuesses = state.guesses.nonEvaluatedGuesses.length
    return completedGuesses === numberOfGuessesInRow
}

/*
                                                   MIDDLEWARES
 *******************************************************************************************************************
 */

/*
 This middleware intercepts incomingGuess event action.
 Checks if there's any guess left for current row and dispatches appropriate action
 */
export const incomingGuessMap: Middleware = (store) => (next) => (action) => {
    next(action)
    if (action.type === incomingGuess.type) {
        const state: RootState = store.getState()
        //check if there's any guess left for current row
        if (isRowEnded(state)) {
            //if no guesses left -> dispatch evaluateRow
            store.dispatch(evaluateRow())
        }
        else {
            store.dispatch(addNonEvaluatedGuess(action.payload))
            //else ->dispatch addNonEvaluatedGuess
        }
    }
}

/*
 this middleware intercepts evaluateRow command action,and dispatches a number of actions
 */
const evaluateRowSplit: Middleware = ({ dispatch }) => (next) => (action) => {
    next(action)
    if (action.type === evaluateRow.type) {
        store.dispatch(clearNonEvaluatedGuesses())
        store.dispatch(setStatus(GameStatus.pending))
        store.dispatch(apiRequest({ method: 'POST', url: '/api/evaluate', onSuccess: evaluationSuccess.type, onError: evaluationError.type, data: {} }))
    }
}

/*
 this middleware intercepts evaluationSuccess event action and dispatches appropriate actions
 */
const evaluationSuccessSplit: Middleware = ({ dispatch, getState }) => (next) => (action) => {
    next(action)
    if (action.type === evaluationSuccess.type) {
        //set evaluated guesses

    }
}

/*
    this middleware intercepts evaluationError event action and dispatches appropriate actions
 */
const evaluationErrorSplit: Middleware = ({ dispatch }) => (next) => (action) => {
    next(action)
    if (action.type === evaluationError.type) {
        dispatch(setStatus(GameStatus.error))
    }
}

export const guessesMiddleware = [evaluationSuccessSplit, evaluationErrorSplit, evaluateRowSplit, incomingGuessMap]

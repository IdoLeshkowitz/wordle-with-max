import {Middleware, PayloadAction} from '@reduxjs/toolkit'
import {setStatus} from '../game/gameActions'
import {
    addNonEvaluatedGuess,
    clearNonEvaluatedGuesses,
    evaluateRow,
    evaluationError,
    evaluationSuccess,
    incomingGuess
} from './guessesActions'
import {RootState} from '../../store'
import {apiRequest} from '../api/apiActions'
import {EvaluatedGuess} from '../../../../../commonTypes/EvaluatedGuess'
import {GameStatus} from "../game/gameSlice";

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
    return completedGuesses === numberOfColumns - 1
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
        } else {
            store.dispatch(addNonEvaluatedGuess(action.payload))
            //else ->dispatch addNonEvaluatedGuess
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
        const {sessionId} = state.game
        const {nonEvaluatedGuesses: guessesToEvaluate} = state.guesses
        dispatch(clearNonEvaluatedGuesses())
        dispatch(setStatus(GameStatus.pending))
        dispatch(apiRequest({
                                method   : 'POST',
                                url      : `http://localhost:3000/evaluate`,
                                onSuccess: evaluationSuccess.type,
                                onError  : evaluationError.type,
                                body     : {guesses: guessesToEvaluate},
                                headers  : {'sessionid': sessionId},
                            }))
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
        console.log(action.payload)
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

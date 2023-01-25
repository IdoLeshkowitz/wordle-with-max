import { RootState } from '../../store'
import { Dispatch, Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { incomingGuess } from '../guesses/guessesActions'
import { keyboardClicked } from './keyboardActions'

export function isLetter(input: string) {
    return /^[A-Z]$/.test(input)
}

export const keyboardClickFlow: Middleware = ({ getState, dispatch }: MiddlewareAPI) => (next: Dispatch) => (action: PayloadAction<string>) => {
    next(action)
    if (action.type === keyboardClicked.type) {
        //checks the type of the entered key
        //case latter -> if game is in progress -> dispatch incomingGuess
        //case backspace || enter-> if game is in progress -> dispatch closeModal
        const enteredKey = action.payload
        const state = getState() as RootState

        /*******************    CASE I: KEY IS LETTER    *******************/
        if (isLetter(enteredKey)) {
            if (state.game.status === 'IN_PROGRESS') {
                dispatch(incomingGuess(enteredKey))
            }
        }

        /*******************    CASE I: KEY IS BACKSPACE    *******************/
        //todo

        /*******************    CASE I: KEY IS ENTER    *******************/
        //todo
    }
}

export const keyboardMiddleware = [keyboardClickFlow]

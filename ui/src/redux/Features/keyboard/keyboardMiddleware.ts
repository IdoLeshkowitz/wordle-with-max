import { RootState } from '../../store'
import { Dispatch, Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { incomingGuess } from '../guesses/guessesActions'
import { keyboardClicked } from './keyboardActions'
import {closeModal} from "../overlays/overlaysActions";

export function isLetter(input: string) {
    return /^[A-Z]$/.test(input)
}

export const keyboardClickFlow: Middleware = ({ getState, dispatch }: MiddlewareAPI) => (next: Dispatch) => (action: PayloadAction<string>) => {
    next(action)
    if (action.type === keyboardClicked.type) {
        //checks the type of the entered key
        //case latter -> if game.ts is in progress -> dispatch incomingGuess
        //case backspace || enter-> if game.ts is in progress -> dispatch closeModal
        const enteredKey = action.payload
        const state = getState() as RootState

        /*******************    CASE I: KEY IS LETTER    *******************/
        if (isLetter(enteredKey)) {
            if (state.game.status === 'IN_PROGRESS') {
                dispatch(incomingGuess(enteredKey))
            }
        }
        /*******************    CASE I: KEY IS ESCAPE    *******************/
        if(enteredKey.toUpperCase() === 'ESCAPE'){
                dispatch(closeModal())
        }
        /*******************    CASE I: KEY IS ENTER    *******************/
        if(enteredKey.toUpperCase() === 'ENTER'){
                dispatch(closeModal())
        }
    }
}

export const keyboardMiddleware = [keyboardClickFlow]

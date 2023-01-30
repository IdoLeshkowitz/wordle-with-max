import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EvaluatedGuess} from '../../../../../commonTypes/EvaluatedGuess';
import {NonEvaluatedGuess} from '../../../../../commonTypes/NonEvaluatedGuess';

interface GuessesState {
    evaluatedGuesses: EvaluatedGuess[];
    nonEvaluatedGuesses: NonEvaluatedGuess[];
}

const InitialState: GuessesState = {
    evaluatedGuesses: [],
    nonEvaluatedGuesses: [],
};
export const guessesSlice = createSlice({
    initialState: InitialState,
    name: 'guesses',
    reducers: {
        addNonEvaluatedGuess(state, action: PayloadAction<string>) {
            const newNonEvaluatedGuess: NonEvaluatedGuess = {
                letter: action.payload,
                index: state.nonEvaluatedGuesses.length
            }
            state.nonEvaluatedGuesses.push(newNonEvaluatedGuess);
        },
        addEvaluatedGuesses(state, action: PayloadAction<EvaluatedGuess[]>) {
            state.evaluatedGuesses = [...state.evaluatedGuesses, ...action.payload];
        },
        clearNonEvaluatedGuesses(state, action: Action) {
            state.nonEvaluatedGuesses = [];
        },
        clearAllGuesses(state, action: Action) {
            state.evaluatedGuesses = [];
            state.nonEvaluatedGuesses = [];
        }
    },
});
export default guessesSlice.reducer;

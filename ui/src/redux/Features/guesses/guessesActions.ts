import { guessesSlice } from './guessesSlice';
import { createAction } from '@reduxjs/toolkit';
import { EvaluatedGuess } from '../../../../../commonTypes/EvaluatedGuess';

// DOCUMENT ACTIONS
export const {clearNonEvaluatedGuesses,addNonEvaluatedGuess,addEvaluatedGuesses,clearAllGuesses} = guessesSlice.actions;


// EVENT ACTIONS
export const evaluationError = createAction('guesses/evaluationsError');
export const evaluationSuccess = createAction<EvaluatedGuess[]>('guesses/evaluationSuccess');
export const incomingGuess = createAction<string>('guesses/incomingGuess');

//COMMAND ACTIONS
export const evaluateRow = createAction('guesses/evaluateRow');

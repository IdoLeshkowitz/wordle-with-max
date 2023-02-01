import {gameSlice} from './gameSlice';
import {createAction} from "@reduxjs/toolkit";

//DOCUMENT ACTIONS
export const {setStatus, restoreStatus, setSessionId,setTargetWord} = gameSlice.actions;

//EVENT ACTIONS
export const startGame = createAction('game/startGame');
export const getSessionSuccess = createAction<string>('game/getSessionSuccess');
export const getSessionError = createAction('game/getSessionError');
export const endSessionSuccess = createAction('game/endSessionSuccess');
export const endSessionError = createAction('game/endSessionError');
import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';

export const keyboardClicked :ActionCreatorWithPayload<string>= createAction<string>('keyboard/keyboardClicked');
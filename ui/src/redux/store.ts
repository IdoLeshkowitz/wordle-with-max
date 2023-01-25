import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './Features/game/gameSlice';
import userReducer from './Features/user/userSlice';
import overlaysReducer from './Features/overlays/overlaysSlice';
import guessesReducer from './Features/guesses/guessesSlice';
import { keyboardMiddleware } from './Features/keyboard/keyboardMiddleware';
import { guessesMiddleware }  from './Features/guesses/guessesMiddleware';
import apiMiddleware from './Features/api/apiMiddleware';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer,
        overlays: overlaysReducer,
        guesses: guessesReducer
    },
    middleware: [
        ...keyboardMiddleware,
        ...guessesMiddleware,
        // ...apiMiddleware
    ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

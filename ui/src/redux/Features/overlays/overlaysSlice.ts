import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export enum ModalType {
    login = 'login',
    help = 'help',
    signup = 'signup',
    gameEnded = 'gameEnded',
}
export enum Toasts{
    CONNECTION_ERROR = 'unable to connect to the server',
    SERVER_ERROR = 'the server encountered an error',
    GAME_ENDED_WITH_WIN = 'congratulations, you won!',
    GAME_ENDED_WITH_LOSS = 'you lost, better luck next time',
}
export interface overlaysState {
    activeModal: ModalType | null;
    spinner: boolean;
    toasts: Toasts[]
}
const overlaysInitialState: overlaysState = {
    activeModal: null,
    spinner: false,
    toasts: [],
};
export const overlaysSlice = createSlice({
    initialState: overlaysInitialState,
    name: 'overlays',
    reducers: {
        closeModal(state) {
            state.activeModal = null;
        },
        openModal (state, action: PayloadAction<ModalType>) {
            state.activeModal = action.payload;
        },
        addToast(state, action: PayloadAction<Toasts>) {
            state.toasts.push(action.payload);
        },
        removeToast(state, action: PayloadAction<Toasts>) {
            //todo
        },
        setSpinner(state, action: PayloadAction<boolean>) {
            state.spinner = action.payload;
        }
    },
});
export default overlaysSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export enum ModalType {
    login = 'login',
    help = 'help',
}
enum Toasts{
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
export const initialOverlaysState: overlaysState = {
    activeModal: null,
    spinner: false,
    toasts: [],
};
const overlaysSlice = createSlice({
    initialState: initialOverlaysState,
    name: 'overlays',
    reducers: {
        setModal(state, action : PayloadAction<ModalType>) {
            //todo
        },
        addToast(state, action: PayloadAction<Toasts>) {
            //todo
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

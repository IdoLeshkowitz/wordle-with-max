import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum GameStatus {
    in_progress = 'IN_PROGRESS',
    ended = 'ENDED',
    pending = 'PENDING',
    error = 'ERROR',
}
export interface GameState {
    settings: {
        numberOfRows: number;
        numberOfGuessesInRow: number;
    };
    status: 'IN_PROGRESS' | 'ENDED' | 'PENDING' | 'ERROR';
    sessionID: string;
}
export const initialState: GameState = {
    settings: {
        numberOfRows: 5,
        numberOfGuessesInRow: 5,
    },
    status: 'IN_PROGRESS',
    sessionID: '0',
};
export const gameSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        setStatus(state, action: PayloadAction<GameStatus>) {
            state.status = action.payload;
        },
    },
});
export default gameSlice.reducer;
export const { setStatus } = gameSlice.actions;
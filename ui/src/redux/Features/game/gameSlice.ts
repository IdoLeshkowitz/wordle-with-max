import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum GameStatus {
    in_progress = 'IN_PROGRESS',
    ended = 'ENDED',
    pending = 'PENDING',
    error = 'ERROR',
}
const statusMemo : GameStatus[] = [];
export interface GameState {
    settings: {
        numberOfRows: number;
        numberOfColumns: number;
    };
    status: GameStatus;
    sessionId: string;
}
export const initialState: GameState = {
    settings: {
        numberOfRows   : 5,
        numberOfColumns: 5,
    },
    status: GameStatus.in_progress,
    sessionId: '0',
};
export const gameSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        setStatus(state, action: PayloadAction<GameStatus>) {
            statusMemo.push(state.status);
            state.status = action.payload;
        },
        restoreStatus(state) {
            state.status = statusMemo.pop() || state.status;
        }
    },
});
export default gameSlice.reducer;
export const { setStatus,restoreStatus } = gameSlice.actions;
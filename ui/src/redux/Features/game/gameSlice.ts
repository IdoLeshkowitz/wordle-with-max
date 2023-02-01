import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum GameStatus {
    inProgress = 'IN_PROGRESS',
    endedWithLoss = 'ENDED_WITH_LOSS',
    endedWithWin = 'ENDED_WITH_WIN',
    pending = 'PENDING',
    error = 'ERROR',
}

const statusMemo: GameStatus[] = [];

export interface GameState {
    settings: {
        numberOfRows: number;
        numberOfColumns: number;
    };
    status: GameStatus;
    sessionId: string;
    targetWord?: string;
}

export const initialState: GameState = {
    settings: {
        numberOfRows: 5,
        numberOfColumns: 5,
    },
    status: GameStatus.inProgress,
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
        },
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
        setTargetWord(state, action: PayloadAction<string>) {
            state.targetWord = action.payload;
        }
    },
})
export default gameSlice.reducer;

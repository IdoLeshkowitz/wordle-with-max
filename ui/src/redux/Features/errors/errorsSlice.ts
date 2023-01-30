import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorType} from "../../../../../commonTypes/Errors";

interface errorsState {
    errors: ErrorType[]
}

const initialState: errorsState = {
    errors: []
}
export const errorsSlice = createSlice({
    name: 'errors',
    initialState: initialState,
    reducers: {
        addError(state, action : PayloadAction<ErrorType>) {
            state.errors.push(action.payload)
        },
        clearError(state, action: PayloadAction<ErrorType>) {
            state.errors = state.errors.filter(error => error !== action.payload)
        }
    },
})

export default errorsSlice.reducer
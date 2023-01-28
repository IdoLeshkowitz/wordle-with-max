import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { User } from '../../../../../commonTypes/User';
export interface UserState {
    currentUser: User | null
}
export const initialUserState: UserState = {
    currentUser: null
};
const userSlice = createSlice({
    initialState: initialUserState,
    name: 'user',
    reducers: {
        setCurrentUser(state, action : PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        clearCurrentUser(state) {
            state.currentUser = null
        }
    },
});

export default userSlice.reducer;

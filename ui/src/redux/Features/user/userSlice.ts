import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../../commonTypes/User';
export interface UserState {
    currentUser: User | null;
}
export const initialUserState: UserState = {
    currentUser: null,
};
const userSlice = createSlice({
    initialState: initialUserState,
    name: 'user',
    reducers: {},
});

export default userSlice.reducer;

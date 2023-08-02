import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        add(state, action) {
            return {...action.payload};
        }
    }
});

export const { add } = user.actions;
export default user.reducer;
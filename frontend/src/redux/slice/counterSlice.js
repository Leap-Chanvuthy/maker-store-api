import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0
};

const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        increment : (state) => {
            state.value ++;
        },
        decrement : (state) => {
            state.value --;
        },
        resetValue : (state) => {
            state.value = 0;
        }
    }
})

export default counterSlice.reducer;
export const {increment , decrement , resetValue} = counterSlice.actions;
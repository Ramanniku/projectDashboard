import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goalFrame: [],  
};

const goalFrameSlice = createSlice({
  name: "goalFrame",
  initialState,
  reducers: {
    saveFrame: (state, action) => {
      state.goalFrame.push(action.payload);
    },
  },
});

export const { saveFrame } = goalFrameSlice.actions;
export default goalFrameSlice.reducer;

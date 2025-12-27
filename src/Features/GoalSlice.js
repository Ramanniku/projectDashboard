 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [],  
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(goal => goal["s.no."] !== action.payload);
    },
    
  },
});

export const { addGoal, deleteGoal } = goalSlice.actions;
export default goalSlice.reducer;

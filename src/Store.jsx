// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './Features/uiSlice';
import goalReducer from './Features/GoalSlice'; 
import goalFrameReducer from './Features/GoalFrameSlice'; 
import  sendBackReqReducer  from './Features/SendBackSlice';
import authReducer from "./Features/authSlice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
      goals: goalReducer, 
      goalFrame: goalFrameReducer,
      sendBackReq: sendBackReqReducer,
      auth: authReducer,  
  },
});

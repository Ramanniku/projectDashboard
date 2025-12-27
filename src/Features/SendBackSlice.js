import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sendBackReq: [],
};

const sendBackReqSlice = createSlice({
  name: "sendBackReq",
  initialState,
  reducers: {
    saveSendBackReq: (state, action) => {
      state.sendBackReq.push(action.payload);
    },
  },
});

export const { saveSendBackReq } = sendBackReqSlice.actions;
export default sendBackReqSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "codeAndGate",
  initialState: { Code: "", Gate: "" },
  reducers: {
    codeAndGateAdded: (state, action) => {
      state.Code = action.payload.Code,
      state.Gate = action.payload.Gate
      
    },

    codeAndGateDeleted: (state, action) => {
        state.Code = "",
        state.Gate = ""
      },
  },
});

export default slice.reducer;
export const { codeAndGateAdded, codeAndGateDeleted } = slice.actions;
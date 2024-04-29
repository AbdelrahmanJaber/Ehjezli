import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "DriverOrderInfo",
  initialState: {
    list: {carNumber: "", code: "", driverName: "", gate: "", type: "", driverNumber: "", driverExpoToken: ""},
    loading: false,
    lastFetch: null,
  },
  reducers: {
    DriverOrderInfoAdded: (state, action) => {
      state.list.carNumber = action.payload.carNumber
      state.list.code = action.payload.code
      state.list.driverName = action.payload.driverName
      state.list.gate = action.payload.gate
      state.list.type = action.payload.type

      state.list.driverNumber = action.payload.driverNumber
      state.list.driverExpoToken = action.payload.driverExpoToken



      
    },
  },
});

export default slice.reducer;
export const { DriverOrderInfoAdded } = slice.actions;

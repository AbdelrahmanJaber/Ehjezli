import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "currentLocation",
  initialState: {
    currentLocation: {longitude:'', latitude: ''},
  },
  reducers: {
      currentLocationAdded: (state, action) => {
        state.currentLocation.longitude = action.payload.longitude
        state.currentLocation.latitude = action.payload.latitude
      }
  },
});

export default slice.reducer;

export const {
    currentLocationAdded,
  } = slice.actions;

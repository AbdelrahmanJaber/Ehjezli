import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "destinationPlaces",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    destinationPlacesRequested: (state, action) => {
      state.loading = true;
    },

    destinationPlacesRequestFailed: (state, action) => {
      state.loading = false;
    },

    destinationPlacesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
  },
});

export default slice.reducer;

const {
  destinationPlacesRequested,
  destinationPlacesRequestFailed,
  destinationPlacesReceived,
} = slice.actions;

//Action Creators Using cache
const url = "/destinationPlaces";
export const loadDestinationPlaces = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.availableDrivers;



  dispatch(
    apiCallBegan({
      url: url,
      onSuccess: destinationPlacesReceived.type,
      onStart: destinationPlacesRequested.type,
      onError: destinationPlacesRequestFailed.type,
    })
  );
};

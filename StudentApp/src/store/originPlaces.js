import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "originPlaces",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    originPlacesRequested: (state, action) => {
      state.loading = true;
    },

    originPlacesRequestFailed: (state, action) => {
      state.loading = false;
    },

    originPlacesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
  },
});

export default slice.reducer;

const {
  originPlacesRequested,
  originPlacesRequestFailed,
  originPlacesReceived
} = slice.actions;



//Action Creators Using cache
const url = "/originPlaces";
export const loadOriginPlaces = () => (dispatch, getState) => {

  
  dispatch(
    apiCallBegan({
      url: url,
      onSuccess: originPlacesReceived.type,
      onStart: originPlacesRequested.type,
      onError: originPlacesRequestFailed.type,
    })
  );
};




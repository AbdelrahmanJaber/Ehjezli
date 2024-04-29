import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "availableDrivers",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    availableDriversRequested: (state, action) => {
      state.loading = true;
    },

    availableDriversRequestFailed: (state, action) => {
      state.loading = false;
    },

    availableDriversReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
  },
});

export default slice.reducer;

 const {
  availableDriversRequested,
  availableDriversRequestFailed,
  availableDriversReceived,
} = slice.actions;
 



//Action Creators Using cache
const url = "/availableDrivers";
export const loadAvailableDrivers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.availableDrivers;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 3) return;
  

  dispatch(
    apiCallBegan({
      url: url,
      onSuccess: availableDriversReceived.type,
      onStart: availableDriversRequested.type,
      onError: availableDriversRequestFailed.type,
    })
  );
};




import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "previousOrder",
  initialState: {
    previousOrderError: '',
    loading: false,
    lastFetch: null,
  },
  reducers: {
    previousOrderRequested: (state, action) => {
      state.loading = true;
    },

    previousOrderFailed: (state, action) => {
      state.loading = false;
    },

    previousOrderReceived: (state, action) => {
      state.previousOrderError = action.payload.error;
      state.loading = false;
      state.lastFetch = Date.now();
    },


  },
});

export default slice.reducer;

const {
    previousOrderRequested,
    previousOrderFailed,
    previousOrderReceived,
  } = slice.actions;



const url = "/checkPreviousOrder";
export const CheckPreviousOrder = () => (dispatch, getState) => {
  
    
      dispatch(
        apiCallBegan({
          url: url ,
          method: 'post',
          onSuccess: previousOrderReceived.type,
          onStart: previousOrderRequested.type,
          onError: previousOrderFailed.type,
    
        })
      );
    };
  
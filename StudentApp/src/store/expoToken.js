import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "expoToken",
  initialState: {
    expoToken: '',
    loading: false,
    lastFetch: null,
  },
  reducers: {
    expoTokenRequested: (state, action) => {
      state.loading = true;
    },

    expoTokenRequestFailed: (state, action) => {
      state.loading = false;
    },

    expoTokenReceived: (state, action) => {
      state.expoToken = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },


  },
});

export default slice.reducer;

const {
    expoTokenRequested,
    expoTokenRequestFailed,
    expoTokenReceived,
  } = slice.actions;



const url = "/student";
export const storeExpoPushToken = ({token}) => (dispatch, getState) => {
      const { lastFetch } = getState().entities.expoToken;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < 120) {
        return};
    
      dispatch(
        apiCallBegan({
          url: url + '/storeExpoToken',
          method: 'post',
          data: {token},
          onSuccess: expoTokenReceived.type,
          onStart: expoTokenRequested.type,
          onError: expoTokenRequestFailed.type,
    
        })
      );
    };
  
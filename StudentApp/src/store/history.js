import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "history",
  initialState: {
    studentHistory: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    studentHistoryRequested: (state, action) => {
      state.loading = true;
    },

    studentHistoryRequestFailed: (state, action) => {
      state.loading = false;
    },

    studentHistoryReceived: (state, action) => {
      state.studentHistory = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },


  },
});

export default slice.reducer;

const {
    studentHistoryRequested,
    studentHistoryRequestFailed,
    studentHistoryReceived,
  } = slice.actions;



const url = "/order";
export const loadHistory = () => (dispatch, getState) => {
      const { lastFetch } = getState().entities.expoToken;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
     
      
    
      dispatch(
        apiCallBegan({
          url: url +'/getStudentHistory',
          onSuccess: studentHistoryReceived.type,
          onStart: studentHistoryRequested.type,
          onError: studentHistoryRequestFailed.type,
    
        })
      );
    };
  
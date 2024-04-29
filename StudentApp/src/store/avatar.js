import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "avatar",
  initialState: {
    avatar: '',
    loading: false,
    lastFetch: null,
  },

  reducers: {
    avatarRequested: (state, action) => {
      state.loading = true;
    },

    avatarRequestFailed: (state, action) => {
      state.loading = false;
    },

    avatarReceived: (state, action) => {
      state.avatar = action.payload.avatar;
      state.loading = false;
      state.lastFetch = Date.now();

    },
  },
});

export default slice.reducer;

const {
    avatarRequested,
    avatarRequestFailed,
    avatarReceived,
  } = slice.actions;



const url = "/student";
export const updateAvatar = ({avatar}) => (dispatch, getState) => {
      dispatch(
        apiCallBegan({
          url: url + '/updateAvatar',
          method: 'patch',
          data: {avatar},
          onSuccess: avatarReceived.type,
          onStart: avatarRequested.type,
          onError: avatarRequestFailed.type,
    
        })
      );
    };


    export const loadAvatar = () => (dispatch, getState) => {
        dispatch(
          apiCallBegan({
            url: url + '/getAvatar',
            onSuccess: avatarReceived.type,
            onStart: avatarRequested.type,
            onError: avatarRequestFailed.type,
          })
        );
      };
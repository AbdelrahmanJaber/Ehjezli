import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "settings",
  initialState: {
    error: "",
    message: "",
    loading: false,
    lastFetch: null,
  },

  reducers: {
    settingsRequested: (state, action) => {
      state.loading = true;
    },

    settingsRequestFailed: (state, action) => {
      state.loading = false;
    },

    settingsReceived: (state, action) => {
      state.error = action.payload.error;
      state.message = action.payload.message;

      state.loading = false;
      state.lastFetch = Date.now();

      if (action.payload.error !== "") {
        alert(action.payload.error);
      } else if (action.payload.message !== "") {
        alert(action.payload.message);
      }
    },
  },
});

export default slice.reducer;

const { settingsRequested, settingsRequestFailed, settingsReceived } =
  slice.actions;

const url = "/student";
export const changePasswordRedux =
  ({ oldPassword, newPassword }) =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: url + "/changePassword",
        method: "patch",
        data: { oldPassword, newPassword },
        onSuccess: settingsReceived.type,
        onStart: settingsRequested.type,
        onError: settingsRequestFailed.type,
      })
    );
  };

export const changeEmailRedux =
  ({ oldEmail, newEmail }) =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: url + "/changeEmail",
        method: "patch",
        data: { oldEmail, newEmail },
        onSuccess: settingsReceived.type,
        onStart: settingsRequested.type,
        onError: settingsRequestFailed.type,
      })
    );
  };

export const changePhoneNumberRedux =
  ({ oldPhoneNumber, newPhoneNumber }) =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: url + "/changePhoneNumber",
        method: "patch",
        data: { oldPhoneNumber, newPhoneNumber },
        onSuccess: settingsReceived.type,
        onStart: settingsRequested.type,
        onError: settingsRequestFailed.type,
      })
    );
  };

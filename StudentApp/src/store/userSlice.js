import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";
import { AppState } from "react-native";

const slice = createSlice({
  name: "userSlice",
  initialState: {
    student: {},
    loading: false,
    lastFetch: null,
  },
  reducers: {
    userRequested: (state, action) => {
      state.loading = true;
    },
    userRequestFailed: (state, action) => {
      state.loading = false;
    },
    userReceived: (state, action) => {
      state.student = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },

    userSignedOut: (state, action) => {
      state.student = {};
    },

    emailUpdated: (state, action) => {
      state.student.email = action.payload.email;
    },
  },
});

export default slice.reducer;

const {
  userRequested,
  userRequestFailed,
  userReceived,
  // userProfileLoaded,
  userSignedOut,
} = slice.actions;

export const { emailUpdated } = slice.actions;

//Action Creators Using cache
const url = "/student";

export const loadProfile = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: url + "/me",
      onSuccess: userReceived.type,
      onStart: userRequested.type,
      onError: userRequestFailed.type,
    })
  );
};

export const updateProfile = ({
  firstName,
  lastName,
  DOB,
  email,
  gender,
  city,
}) =>
  apiCallBegan({
    url: url + "/me",
    method: "patch",
    data: { firstName, lastName, DOB, email, gender, city },
    onSuccess: userReceived.type,

    onStart: userRequested.type,
    onError: userRequestFailed.type,
  });

export const signInUser = ({ email, password }) =>
  apiCallBegan({
    url: url + "/login",
    method: "post",
    data: { email, password },
    onSuccess: userSignedIn.type,
  });

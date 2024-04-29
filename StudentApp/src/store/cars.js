import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

import moment from "moment";

const slice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    carsPlacesRequested: (state, action) => {
      state.loading = true;
    },

    carsPlacesRequestFailed: (state, action) => {
      state.loading = false;
    },

    carsPlacesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
  },
});

export default slice.reducer;

const { carsPlacesRequested, carsPlacesRequestFailed, carsPlacesReceived } =
  slice.actions;

const url = "/cars";
export const loadCars = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: url,
      onSuccess: carsPlacesReceived.type,
      onStart: carsPlacesRequested.type,
      onError: carsPlacesRequestFailed.type,
    })
  );
};

export const getAvailableCars = (track) =>
  createSelector(
    (state) => state.entities.cars,
    (cars) => cars.list.filter((car) => car.carTrack === track)
  );

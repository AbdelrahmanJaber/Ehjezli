import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";


const slice = createSlice({
  name: "FullOrder",
    initialState: {
        list: {
          origin: {
              gateName: "",
              longitude: "",
              latitude: "",
          },
          destination: {
            mainDestination:"",
            subDestination: "",
            exactDestination: "", 
            longitude: "",
            latitude: "",
          },
          car: {
              type: "",
              price: ""
          },
          time: {
            value: ""
          },
          distance: {
            value: ""
          }
        },
        loading: false,
        lastFetch: null,
      },
  reducers: {
    originAdded: (state, action) => {
        state.list.origin.gateName = action.payload.gateName
        state.list.origin.longitude = action.payload.longitude
        state.list.origin.latitude = action.payload.latitude
    },

    destinationAdded: (state, action) => {
        state.list.destination.mainDestination = action.payload.mainDestination
        state.list.destination.subDestination = action.payload.subDestination
        state.list.destination.exactDestination = action.payload.exactDestination
        state.list.destination.longitude = action.payload.longitude
        state.list.destination.latitude = action.payload.latitude
    },

    carAdded: (state, action) => {
        state.list.car.type = action.payload.type
        state.list.car.price = action.payload.price
    },

    timeAdded: (state, action) => {
      state.list.time.value = action.payload.time
    },

    distanceAdded: (state, action) => {
      state.list.distance.value = action.payload.distance
    },
    orderStored: (state, action) => {
  },

  },
});

export default slice.reducer;
export const { originAdded, destinationAdded, carAdded, timeAdded, distanceAdded, orderStored} = slice.actions;





export const storeTheOrder = ({origin, destination, car}) => apiCallBegan({
  url: '/orders',
  method: 'post',
  data: {origin, destination, car},
  onSuccess: orderStored.type,
})

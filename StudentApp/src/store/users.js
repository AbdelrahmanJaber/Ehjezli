import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect'
 
let lastID = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastID,
        name: action.payload.name,
      });
    },
  },
});


export default slice.reducer
export const {userAdded} = slice.actions


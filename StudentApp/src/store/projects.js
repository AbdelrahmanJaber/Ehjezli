import { createSlice } from "@reduxjs/toolkit";

let lastID = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        id: ++lastID,
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
export const { projectAdded } = slice.actions;

import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateActiveLinks } = UseInitialStates();

export const activeLinkSlice = createSlice({
  name: "activeLinkSlice",
  initialState: initialStateActiveLinks,
  reducers: {
    activate: (state, action) => {
      localStorage.setItem("activeLink", action.payload);
      state.activeLink = localStorage.getItem("activeLink") || "";
    },
  },
});

export default activeLinkSlice.reducer;
export const { activate } = activeLinkSlice.actions;

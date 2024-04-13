import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateMode } = UseInitialStates();

export const modeSlice = createSlice({
  name: "modeSlice",
  initialState: initialStateMode,
  reducers: {
    change: (state) => {
      localStorage.setItem(
        "mymode",
        localStorage.getItem("mymode") === "false" ? true : false
      );
      state.mymode =
        localStorage.getItem("mymode") === "true" ? "dark" : "light";
    },
  },
});

export default modeSlice.reducer;
export const { change } = modeSlice.actions;

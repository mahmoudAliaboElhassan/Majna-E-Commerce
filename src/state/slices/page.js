import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStatePage } = UseInitialStates();

export const PageSlice = createSlice({
  name: "PageSlice",
  initialState: initialStatePage,
  reducers: {
    setPage: (state, action) => {
      localStorage.setItem("page", action.payload);
      state.page = localStorage.getItem("page");
    },
  },
});

export default PageSlice.reducer;
export const { setPage } = PageSlice.actions;

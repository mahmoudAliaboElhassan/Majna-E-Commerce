import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateSearch } = UseInitialStates();

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: initialStateSearch,
  reducers: {
    handleSearchChange: (state, action) => {
      localStorage.setItem("searchChange", action.payload);
      state.searchChange = localStorage.getItem("searchChange");
      console.log(state.searchChange);
    },
    handleSearchValue: (state) => {
      localStorage.setItem(
        "searchValue",
        state.searchChange?.split(" ")?.join("+")
      );
      state.searchValue = localStorage.getItem("searchValue");
      console.log(state.searchValue);
    },
  },
});

export default searchSlice.reducer;
export const { handleSearchChange, handleSearchValue } = searchSlice.actions;

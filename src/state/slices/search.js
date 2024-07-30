import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateSearch } = UseInitialStates();

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: initialStateSearch,
  reducers: {
    handleSearchChange: (state, action) => {
      state.searchChage = action.payload;
    },
    handleSearchValue: (state, action) => {
      state.searchValue = action.payload.split(" ").join("+");
    },
  },
});

export default searchSlice.reducer;
export const { handleSearchChange, handleSearchValue } = searchSlice.actions;

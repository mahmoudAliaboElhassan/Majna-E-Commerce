import { createSlice } from "@reduxjs/toolkit";

import {
  getAllAddresses,
  addAddress,
  editAddress,
  deleteAddress,
} from "@state/act/actCustomer";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateUser } = UseInitialStates();

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateUser,
  reducers: {},
  extraReducers: (builder) => {},
});

export default customerSlice.reducer;
export { getAllAddresses, addAddress, editAddress, deleteAddress };

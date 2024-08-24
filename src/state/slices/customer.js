import { createSlice } from "@reduxjs/toolkit";

import {
  getAllAddresses,
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,AddOrder,getAllOrders
} from "@state/act/actCustomer";

import UseInitialStates from "@hooks/use-initial-state";

const { initialStateUser } = UseInitialStates();

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateUser,
  reducers: {
    cleanUpGetAllAddresses: (state) => {
      state.addresses = [];
    },
    cleanUpGetAddresses: (state) => {
      state.singleAddressData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state, action) => {
        state.loadingAddAddress = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loadingAddAddress = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loadingAddAddress = false;
      })
      .addCase(getAllAddresses.pending, (state, action) => {
        state.loadingGetAddresses = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loadingGetAddresses = false;
        state.addresses = action.payload.addresses;
        state.countOfAddresses = action.payload.addresses.length;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loadingGetAddresses = false;
      })
      .addCase(getAddress.pending, (state, action) => {
        state.loadingGetSpecificAddress = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loadingGetSpecificAddress = false;
        state.singleAddressData = action.payload.address;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loadingGetSpecificAddress = false;
      })
      .addCase(editAddress.pending, (state, action) => {
        state.loadingEditAddress = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.loadingEditAddress = false;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loadingEditAddress = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.countOfAddresses -= 1;
      });
  },
});

export default customerSlice.reducer;
export { getAllAddresses, addAddress, getAddress, editAddress, deleteAddress,AddOrder,getAllOrders };
export const { cleanUpGetAllAddresses, cleanUpGetAddresses } =
  customerSlice.actions;

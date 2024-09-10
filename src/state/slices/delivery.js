import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "@hooks/use-initial-state";
import {
  getDeliveryOrders,
  getSpecificOrder,
  updateSpecificOrder,
} from "@state/act/actDelivery";

const { initialStateDelivery } = UseInitialStates();

export const deliverySlice = createSlice({
  name: "deliverySlice",
  initialState: initialStateDelivery,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryOrders.pending, (state, action) => {
        state.loadingOrdersDelivery = true;
      })
      .addCase(getDeliveryOrders.fulfilled, (state, action) => {
        state.loadingOrdersDelivery = false;
        state.ordersDelivery = action.payload.results;
      })
      .addCase(getDeliveryOrders.rejected, (state, action) => {
        state.loadingOrdersDelivery = false;
      })
      .addCase(getSpecificOrder.pending, (state, action) => {
        state.loadingSpecificOrderData = true;
      })
      .addCase(getSpecificOrder.fulfilled, (state, action) => {
        state.loadingSpecificOrderData = false;
        state.specificOrderData = action.payload;
      })
      .addCase(getSpecificOrder.rejected, (state, action) => {
        state.loadingSpecificOrderData = false;
      })
      .addCase(updateSpecificOrder.pending, (state, action) => {
        state.loadingUpdateOrderStatus = true;
      })
      .addCase(updateSpecificOrder.fulfilled, (state, action) => {
        state.loadingUpdateOrderStatus = false;
      })
      .addCase(updateSpecificOrder.rejected, (state, action) => {
        state.loadingUpdateOrderStatus = false;
      });
  },
});
export default deliverySlice.reducer;
export { getDeliveryOrders, getSpecificOrder, updateSpecificOrder };

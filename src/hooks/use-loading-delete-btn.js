import React from "react";

import { useSelector } from "react-redux";

function UseLoadingStatusUpdateDeleteBtn() {
  const { loadingDeleteStore, loadingDeleteProduct } = useSelector(
    (state) => state.distributor
  );
  const { loadingEditCartQuantity, loadingDeleteCart, loadingDeleteFavorite } =
    useSelector((state) => state.cart);
  const { loadingDeleteAddress } = useSelector((state) => state.customer);
  const LoadingStatusDeleteUpdate =
    loadingDeleteStore ||
    loadingDeleteProduct ||
    loadingEditCartQuantity ||
    loadingDeleteCart ||
    loadingDeleteFavorite ||
    loadingDeleteAddress;
  return Boolean(LoadingStatusDeleteUpdate);
}

export default UseLoadingStatusUpdateDeleteBtn;

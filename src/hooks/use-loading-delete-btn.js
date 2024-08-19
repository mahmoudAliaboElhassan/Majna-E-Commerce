import React from "react";

import { useSelector } from "react-redux";

function UseLoadingStatusUpdateDeleteBtn() {
  const { loadingDeleteStore, loadingDeleteProduct } = useSelector(
    (state) => state.distributor
  );
  const { loadingEditCartQuantity, loadingDeleteCart, loadingDeleteFavorite } =
    useSelector((state) => state.cart);
  const LoadingStatusDeleteUpdate =
    loadingDeleteStore ||
    loadingDeleteProduct ||
    loadingEditCartQuantity ||
    loadingDeleteCart ||
    loadingDeleteFavorite;
  return Boolean(LoadingStatusDeleteUpdate);
}

export default UseLoadingStatusUpdateDeleteBtn;

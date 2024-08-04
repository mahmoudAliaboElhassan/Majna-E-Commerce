import React from "react";

import { useSelector } from "react-redux";

function UseLoadingStatus() {
  const { loading } = useSelector((state) => state.auth);
  const {
    loadingAddBrand,
    loadingStore,
    loadingEditStore,
    loadingAddProduct,
    loadingUpdateProduct,
  } = useSelector((state) => state.distributor);
  const loadinStatus =
    loading ||
    loadingAddBrand ||
    loadingStore ||
    loadingEditStore ||
    loadingAddProduct ||
    loadingUpdateProduct;
  return Boolean(loadinStatus);
}

export default UseLoadingStatus;

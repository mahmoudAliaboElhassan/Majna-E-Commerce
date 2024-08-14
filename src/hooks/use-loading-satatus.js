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
  const { loadingAddAddress,loadingEditAddress } = useSelector((state) => state.customer);
  const loadinStatus =
    loading ||
    loadingAddBrand ||
    loadingStore ||
    loadingEditStore ||
    loadingAddProduct ||
    loadingUpdateProduct ||
    loadingAddAddress||loadingEditAddress;
  return Boolean(loadinStatus);
}

export default UseLoadingStatus;

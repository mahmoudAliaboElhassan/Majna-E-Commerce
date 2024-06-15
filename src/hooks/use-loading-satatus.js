import React from "react";

import { useSelector } from "react-redux";

function UseLoadingStatus() {
  const { loading } = useSelector((state) => state.auth);
  const { loadingAddBrand, loadingStore, loadingEdit, loadingAddProduct } =
    useSelector((state) => state.distributor);
  const loadinStatus =
    loading ||
    loadingAddBrand ||
    loadingStore ||
    loadingEdit ||
    loadingAddProduct;
  return Boolean(loadinStatus) ;
}

export default UseLoadingStatus;

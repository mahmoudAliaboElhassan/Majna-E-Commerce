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
  const { loadingAddAddress, loadingEditAddress, loadingAddOrder } =
    useSelector((state) => state.customer);
    const{loadingAddAlbumItem}=useSelector((state)=>state.album)
  const loadinStatus =
    loading ||
    loadingAddBrand ||
    loadingStore ||
    loadingEditStore ||
    loadingAddProduct ||
    loadingUpdateProduct ||
    loadingAddAddress ||
    loadingEditAddress ||
    loadingAddOrder||loadingAddAlbumItem;
  return Boolean(loadinStatus);
}

export default UseLoadingStatus;

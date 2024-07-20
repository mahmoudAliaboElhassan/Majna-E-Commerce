import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getSpecifiedProduct } from "@state/slices/products";

function ProductInformation() {
  const dispatch = useDispatch();

  const { productId } = useParams();
  useEffect(() => {
    dispatch(getSpecifiedProduct({ id: productId }));
  }, [dispatch]);
  return <div>{productId}</div>;
}

export default ProductInformation;

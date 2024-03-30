import React from "react";

import { useParams } from "react-router-dom";

function ProductType() {
  const { producttype } = useParams();
  console.log(producttype);
  return <div>{producttype}</div>;
}

export default ProductType;

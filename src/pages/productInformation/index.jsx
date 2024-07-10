import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function ProductInformation() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const { productId } = useParams();
  return <div>{productId}</div>;
}

export default ProductInformation;

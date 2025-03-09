import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCartItem } from "@state/act/actCarts";

function SpecificCartItem() {
  const { cartId } = useParams();
  const dispatch = useDispatch();
  const { Uid } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(
      getCartItem({
        customerId: Uid,
        cartId,
      })
    );
  }, [dispatch]);
  return (
    <>
      <div>specific cart item</div>
      <div>{cartId}</div>
      <img src={cartItem?.product?.cover_image} loading="lazy" />
    </>
  );
}

export default SpecificCartItem;

import React from "react";

function CartListProducts({ records, rendercarts }) {
  return <div>{records?.map((record) => rendercarts(record))}</div>;
}

export default CartListProducts;

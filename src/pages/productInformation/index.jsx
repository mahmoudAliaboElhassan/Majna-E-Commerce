import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpecifiedProduct, cleanUpGetSpecifiedProduct } from "@state/slices/products";

function ProductInformation() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getSpecifiedProduct({ id: productId }));
    return () => {
      dispatch(cleanUpGetSpecifiedProduct())
    }
  }, [dispatch, productId]);

  const { productData } = useSelector((state) => state.products);

  let id, name, brand, price, category, sub_category, description, inventory, added_at, album_items, stores, total_quantity;

  if (productData) {
    ({ id, name, brand, price, category, sub_category, description, inventory, added_at, album_items } = productData);
    if (inventory) {
      // console.log("inventory")
      // console.log(inventory)
      ({ stores, total_quantity } = inventory)
    }
  }

  console.log(id);
  console.log(name);
  console.log(brand);
  console.log(price);
  console.log(category);
  console.log(description);
  console.log(inventory);
  console.log(stores);
  console.log(sub_category);
  console.log(stores);
  console.log(album_items);
  console.log(added_at);

  return (
    <>
      <div>{id}</div>
      <div>{name}</div>
      <div>{brand}</div>
      <div>{price}</div>
      <div>{category}</div>
      <div>{sub_category}</div>
      <div>{description}</div>
      <div>{added_at}</div>
      {album_items?.map(({ url, is_cover }) => (
        <React.Fragment key={url}>
          <img src={url} alt="Product" />
          <div>{is_cover ? "true" : "false"}</div>
        </React.Fragment>
      ))}
      {total_quantity}
      {stores?.map(({ quantity }) => (
        <React.Fragment key={quantity}>
          <div>{quantity}</div>
        </React.Fragment>
      ))}
    </>
  );
}

export default ProductInformation;

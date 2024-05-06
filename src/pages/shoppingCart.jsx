import { useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "@components/cart/carItem";
import { actGetCategoriesByItems } from "@state/slices/cart";
import CartListProducts from "@components/cart/cartListProducts";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { productFullInfo } = useSelector((state) => state.cart);
  console.log(productFullInfo);
  useEffect(() => {
    dispatch(actGetCategoriesByItems());
  }, [dispatch]);
  return (
    <Box sx={{ p: 2 }}>
      <div data-aos="fade-up">Products added to Cart</div>
      <CartListProducts
        records={productFullInfo}
        rendercarts={(cart) => <CartItem {...cart} />}
      />
    </Box>
  );
}
export default ShoppingCart;

import { useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "@components/cart/carItem";
import CartListProducts from "@components/cart/cartListProducts";
import { actGetCategoriesByItems } from "@state/slices/cart";
import {
  getCarts,
  getCartItem,
  updateQuantity,
  cleanUpCartItems,
  cleanUpCartItem,
} from "@state/slices/cart";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { productFullInfo } = useSelector((state) => state.cart);
  console.log(productFullInfo);
  const { Uid } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch(
    // actGetCategoriesByItems({
    //   title: "Mahmoud",
    //   description: "descriptionoftext",
    //   price: null,
    //   cat: "",
    // })
    dispatch(getCarts({ id: Uid }));
    dispatch(getCartItem({ customerId: Uid, cartId: 1 }));
    // .unwrap()
    // .then();
    return () => {
      dispatch(cleanUpCartItems());
      dispatch(cleanUpCartItem());
    };
  }, [dispatch]);
  return (
    <Box sx={{ p: 2 }}>
      <div data-aos="fade-up">Products added to Cart</div>
      <CartListProducts
        records={productFullInfo}
        rendercarts={(cart) => <CartItem {...cart} />}
      />
      <button
        onClick={() =>
          dispatch(updateQuantity({ customerId: Uid, cartId: 1, quantity: 5 }))
        }
      >
        update
      </button>
    </Box>
  );
}
export default ShoppingCart;

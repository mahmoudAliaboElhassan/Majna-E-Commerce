import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { getTotalQuantities } from "@state/slices/cart";

const UseDebounce = (timer) => {
  // const qunatityNumbers = useSelector(getTotalQuantities);
  const { countOfCartItems, countOfFavoritesProducts } = useSelector(
    (state) => state.cart
  );
  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    if (!countOfCartItems) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, timer);

    return () => {
      clearTimeout(debounce);
      console.log("return from effect");
    };
  }, [countOfCartItems, countOfFavoritesProducts]);
  return [isAnimate, setIsAnimate];
};
export default UseDebounce;

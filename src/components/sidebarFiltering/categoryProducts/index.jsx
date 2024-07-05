import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "@state/slices/distributor";

function CategoryProducts({ handleProductsByCategory }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const { categories } = useSelector((state) => state.distributor);
  return (
    <div>
      {categories.map(({ id, name }) => (
        <div onClick={() => handleProductsByCategory(id)}>{name}</div>
      ))}
    </div>
  );
}

export default CategoryProducts;

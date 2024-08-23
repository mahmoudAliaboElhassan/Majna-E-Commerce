import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

import Input from "@components/sidebarFiltering/input";
import { getCategories } from "@state/slices/distributor";
import UseThemMode from "@hooks/use-theme";
import { FilteringBox } from "@styles/products";
// import "@components/sidebarFiltering/category/category.css";

function Category({ handleProductsByCategory, selectedCategory }) {
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();

  const { categories } = useSelector((state) => state.distributor);
  useEffect(() => {
    if (categories.length === 0) { dispatch(getCategories()) }
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <FilteringBox>
      <Typography
        sx={{
          fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" },
          textAlign: "center"
        }}
        className="sidebar-title"
      >
        {t("categories")}
      </Typography>
      <div>
        <Input
          key={"all"}
          handleChange={() => handleProductsByCategory("")}
          value={null}
          title={t("all")}
          name="category"
          isCheck={selectedCategory === ""}
        />
        {categories?.length ? categories.map(({ id, name }) => (
          <Input
            key={id}
            handleChange={() => handleProductsByCategory(id)}
            value={id}
            title={name}
            name="category"
            isCheck={+selectedCategory === id}
          />
        )) : <Typography sx={{
          textAlign: "center",
          fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "20px" },
          maxWidth: "80%", margin: "auto"
        }}>{t('wait-catogeries')}</Typography>}
      </div>
    </FilteringBox>
  );
}

export default Category;

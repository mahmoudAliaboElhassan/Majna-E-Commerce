import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Input from "@components/sidebarFiltering/input";
import { getCategories } from "@state/slices/distributor";
import Typography from "@mui/material/Typography";
import UseThemMode from "@hooks/use-theme";

import "./category.css";

function Category({ handleProductsByCategory, selectedCategory }) {
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.distributor);
  const { t } = useTranslation();

  return (
    <div
      style={{
        borderBottom: `1px solid ${themeMode === "dark" ? "white" : "black"}`,
        paddingBottom: "20px",

      }}
    >
      <Typography
        sx={{ fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" } }}
        className="sidebar-title"
      >
        {t("categories")}
      </Typography>
      <div>
        {/* <label className="sidebar-label-container"> */}
        <div>
          <Input
            key={"all"}
            handleChange={() => handleProductsByCategory(null)}
            value={null}
            title={t("all")}
            name="test"
            isCheck={selectedCategory === null}
          />
          {categories?.map(({ id, name }) => (
            <Input
              key={id}
              handleChange={() => handleProductsByCategory(id)}
              value={id}
              title={name}
              name="test"
            />
          ))}
        </div>
        {/* </label> */}
      </div>
    </div>
  );
}

export default Category;

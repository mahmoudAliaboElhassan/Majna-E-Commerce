import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@components/sidebarFiltering/input";
import { getCategories } from "@state/slices/distributor";
import "./category.css";
import { useTranslation } from "react-i18next";

function Category({ handleProductsByCategory }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.distributor);
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="sidebar-title">{t("categories")}</h2>
      <div>
        <label className="sidebar-label-container">
          <div>
          <Input
              key={"all"}
              handleChange={() => handleProductsByCategory(null)}
              value={null}
              title={t("all")}
              name="test"
            />
            {categories.map(({ id, name }) => (
              <Input
                key={id}
                handleChange={() => handleProductsByCategory(id)}
                value={id}
                title={name}
                name="test"
              />
            ))}

          </div>
        </label>
      </div>
    </div>
  );
}

export default Category;

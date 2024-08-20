import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

import Input from "@components/sidebarFiltering/input";
import { getSubCategory } from "@state/slices/distributor";
import UseThemMode from "@hooks/use-theme";
import "@components/sidebarFiltering/category/category.css";
import { FilteringBox } from "@styles/products";


function SubCategory({
    handleSelectedSubCategory, selectedCategory, selectedSubCategory
}) {
    const dispatch = useDispatch();
    const { themeMode } = UseThemMode();

    useEffect(() => {
        dispatch(getSubCategory());
    }, [dispatch]);

    const { subCategories } = useSelector((state) => state.distributor);
    const { t } = useTranslation();
    const filteredSubCategories = selectedCategory ? subCategories?.filter(
        (subcat) => subcat.category_id == selectedCategory
    ) : subCategories;
    console.log("typeof (subCategories[0]?.id)")
    console.log(typeof (subCategories[0]?.id))
    return (
        <FilteringBox>
            <Typography
                sx={{ fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" }, textAlign: "center" }}
                className="sidebar-title"
            >
                {t("sub-category")}
            </Typography>
            {/* <label className="sidebar-label-container"> */}
            <div>
                <Input
                    key={"all"}
                    handleChange={() => handleSelectedSubCategory("")}
                    value={null}
                    title={t("all")}
                    name="subCategory"
                    isCheck={selectedSubCategory === ""}
                />
                {filteredSubCategories?.length ? filteredSubCategories.map(({ id, name }) => (
                    <Input
                        key={id}
                        handleChange={() => handleSelectedSubCategory(id)}
                        value={id}
                        title={name}
                        name="subCategory"
                        isCheck={+selectedSubCategory === id}
                    />
                )) : <Typography sx={{
                    textAlign: "center",
                    fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "20px" },
                    maxWidth: "80%", margin: "auto"
                }}>{t('wait-sub-catogeries')}</Typography>}
            </div>
            {/* </label> */}
        </FilteringBox>
    );
}

export default SubCategory;

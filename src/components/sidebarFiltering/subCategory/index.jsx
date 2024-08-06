import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

import Input from "@components/sidebarFiltering/input";
import { getSubCategory } from "@state/slices/distributor";
import UseThemMode from "@hooks/use-theme";
import "@components/sidebarFiltering/category/category.css";

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
    console.log("filteredSubCategories")
    console.log(filteredSubCategories)
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
                {t("sub-category")}
            </Typography>
            <div>
                {/* <label className="sidebar-label-container"> */}
                <div>
                    <Input
                        key={"all"}
                        handleChange={() => handleSelectedSubCategory(null)}
                        value={null}
                        title={t("all")}
                        name="test"
                        isCheck={selectedSubCategory === null}
                    />
                    {filteredSubCategories?.length ? filteredSubCategories.map(({ id, name }) => (
                        <Input
                            key={id}
                            handleChange={() => handleSelectedSubCategory(id)}
                            value={id}
                            title={name}
                            name="test"
                            isCheck={selectedSubCategory === id}
                        />
                    )) : <Typography sx={{
                        textAlign: "center",
                        fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "20px" },
                        maxWidth: "80%", margin: "auto"
                    }}>{t('wait-sub-categories')}</Typography>}
                </div>
                {/* </label> */}
            </div>
        </div>
    );
}

export default SubCategory;

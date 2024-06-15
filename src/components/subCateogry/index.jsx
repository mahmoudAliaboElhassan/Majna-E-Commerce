import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import SelectComp from "@components/formui/Select";
import { helperStyle } from "@styles/error";

function SubCategorySelect({ subCategories }) {
  const { values } = useFormikContext();
  const selectedCategory = values.categories;
  const { t } = useTranslation();
  const filteredSubCategories = subCategories.filter(
    (subcat) => subcat.id == selectedCategory
  );

  return (
    <>
      {selectedCategory ? (
        <SelectComp
          name="sub_category_pk"
          label={t("sub-category")}
          options={filteredSubCategories}
        />
      ) : (
        <>
          <SelectComp
            name="sub_category_pk"
            label={t("sub-category")}
            options={filteredSubCategories}
          />
          <Typography component="div" style={helperStyle}>
            {t("category-first")}
          </Typography>
        </>
      )}
    </>
  );
}

export default SubCategorySelect;

import React from "react";

import { TextField, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import UseInitialValues from "@utils/use-initial-values";
import UseFormValidation from "@formValidation/use-form-validation";
import UseThemeMode from "@hooks/use-theme";
import Typography from "@mui/material/Typography";
import { FilteringBox } from "@styles/products";


const Price = ({ handlePriceChange, priceFromTo, handleClickPrice }) => {
  const { INITIAL_FORM_STATE_PRICES } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_PRICES } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemeMode();
  return (
    <FilteringBox>
      <Typography
        sx={{ fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" }, textAlign: "center" }}
        className="sidebar-title"
      >
        {t("price")}
      </Typography>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE_PRICES,
        }}
        validationSchema={FORM_VALIDATION_SCHEMA_PRICES}
        onSubmit={(values) => {
          handleClickPrice(values);
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <TextField
              type="number"
              name="priceFrom"
              placeholder={t("price-from")}
              value={values.priceFrom || ""}
              onChange={(e) => {
                handlePriceChange(0, e.target.value);
                setFieldValue("priceFrom", e.target.value);
              }}
              error={touched.priceFrom && Boolean(errors.priceFrom)}
              helperText={touched.priceFrom && errors.priceFrom}
              variant="outlined"
              margin="normal"
            // fullWidth
            />
            <TextField
              name="priceTo"
              type="number"
              placeholder={t("price-to")}
              min={values.priceFrom ? parseInt(values.priceFrom, 10) + 1 : ""}
              value={values.priceTo || ""}
              onChange={(e) => {
                handlePriceChange(1, e.target.value);
                setFieldValue("priceTo", e.target.value);
              }}
              error={touched.priceTo && Boolean(errors.priceTo)}
              helperText={touched.priceTo && errors.priceTo}
              variant="outlined"
              margin="normal"
            // fullWidth
            />
            <Button
              type="submit"
              variant={themeMode === "dark" ? "contained" : "outlined"}
              fullWidth
            >
              {t("search")}
            </Button>
          </Form>
        )}
      </Formik>
    </FilteringBox>
  );
};

export default Price;

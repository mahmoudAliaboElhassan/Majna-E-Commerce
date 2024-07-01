import React from "react";
import { TextField } from "@mui/material";
import UseInitialValues from "@utils/use-initial-values";
import UseFormValidation from "@formValidation/use-form-validation";
import { Form, Formik } from "formik";

const Price = ({ handlePriceChange, priceFromTo, handleClickPrice }) => {
  const { INITIAL_FORM_STATE_PRICES } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_PRICES } = UseFormValidation();

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2 className="sidebar-title price-title" style={{ marginTop: "20px" }}>
        Price
      </h2>
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
              placeholder="Price From"
              value={values.priceFrom || ""}
              onChange={(e) => {
                handlePriceChange(0, e.target.value);
                setFieldValue("priceFrom", e.target.value);
              }}
              error={touched.priceFrom && Boolean(errors.priceFrom)}
              helperText={touched.priceFrom && errors.priceFrom}
            />
            <TextField
              name="priceTo"
              type="number"
              placeholder="Price To"
              min={values.priceFrom ? parseInt(values.priceFrom, 10) + 1 : ""}
              value={values.priceTo || ""}
              onChange={(e) => {
                handlePriceChange(1, e.target.value);
                setFieldValue("priceTo", e.target.value);
              }}
              error={touched.priceTo && Boolean(errors.priceTo)}
              helperText={touched.priceTo && errors.priceTo}
            />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Price;

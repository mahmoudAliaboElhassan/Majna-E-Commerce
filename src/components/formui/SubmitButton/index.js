import React from "react";

import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { t } = useTranslation();
  const { submitForm } = useFormikContext();
  const { loading } = useSelector((state) => state.auth);
  const { loadingProducts, loadingStore } = useSelector(
    (state) => state.distributor
  );
  const handleSubmit = (e) => {
    submitForm();
    // console.log(e.target);
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    type: "submit",
    disabled: loading || loadingProducts || loadingStore,
    onClick: handleSubmit,
  };
  console.log(loading);
  return (
    <Button {...configButton}>
      {loading || loadingProducts || loadingStore ? t("laoading") : children}
    </Button>
  );
};

export default ButtonWrapper;

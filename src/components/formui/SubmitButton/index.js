import React from "react";

import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UseLoadingStatus from "@hooks/use-loading-satatus";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { t } = useTranslation();
  const { submitForm } = useFormikContext();
  const { loading } = useSelector((state) => state.auth);
  const { loadingAddBrand, loadingStore, loadingEdit, loadingAddProduct } =
    useSelector((state) => state.distributor);
  const handleSubmit = (e) => {
    submitForm();
    // console.log(e.target);
  };

  const  loadinStatus   = UseLoadingStatus();
  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    type: "submit",
    disabled: loadinStatus,
    style: { color: "white" },
    onClick: handleSubmit,
  };
  console.log(loading);
  return (
    <Button {...configButton}>{loadinStatus ? t("laoading") : children}</Button>
  );
};

export default ButtonWrapper;

import React from "react";

import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

import UseLoadingStatus from "@hooks/use-loading-satatus";
import UseThemMode from "@hooks/use-theme";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { t } = useTranslation();
  const { submitForm } = useFormikContext();

  const handleSubmit = (e) => {
    submitForm();
    // console.log(e.target);
  };
  const { themeMode } = UseThemMode();
  const loadinStatus = UseLoadingStatus();
  const configButton = {
    color: "primay",
    fullWidth: true,
    type: "submit",
    disabled: loadinStatus,
    onClick: handleSubmit,
    variant: themeMode === "dark" ? "contained" : "outlined",
  };
  return (
    <Button {...configButton}>{loadinStatus ? t("laoading") : children}</Button>
  );
};

export default ButtonWrapper;

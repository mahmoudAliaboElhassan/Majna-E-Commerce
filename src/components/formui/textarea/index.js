import * as React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function TextAreaWrapper({
  name,
  label,
  placeholder,
  ...otherProps
}) {
  const [field, meta] = useField(name);
  const configTextFieldArea = {
    fullWidth: true,
    variant: "outlined",
    multiline: true,
    minRows: 3,
    maxRows: 10,
    placeholder,
    ...field,
    ...otherProps,
  };
  const { t } = useTranslation();
  if (meta && meta.touched && meta.error) {
    configTextFieldArea.error = true;
    configTextFieldArea.helperText = meta.error;
  }

  return (
    <TextField
      {...configTextFieldArea}
      aria-label="textarea"
      style={{
        width: "100%",
        background: "inherit",
        color: "white",
        padding: "5px",
      }}
      // placeholder={t("description-txt")}
    />
  );
}

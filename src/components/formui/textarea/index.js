import * as React from "react";

import { useField } from "formik";

import { Textarea } from "@styles/addProductTextArea";

export default function TextAreaWrapper({ name, label, ...otherProps }) {
  const [field, mata] = useField(name);
  const configTextFieldArea = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextFieldArea.error = true;
    configTextFieldArea.helperText = mata.error;
  }
  return (
    <Textarea
      {...configTextFieldArea}
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
    />
  );
}

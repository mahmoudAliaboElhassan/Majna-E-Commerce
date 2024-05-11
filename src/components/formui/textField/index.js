import React from "react";

import { TextField } from "@mui/material";
import { useField } from "formik";

const TextFieldWrapper = ({ name, type, ...otherProps }) => {
  const [field, mata] = useField(name);
  const configTextField = {
    fullWidth: true,
    type: type || "text",
    variant: "outlined",
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  return (
    <div>
      <TextField {...configTextField} />
    </div>
  );
};

export default TextFieldWrapper;

import React from "react";

import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

import UseThemMode from "../../../hooks/use-theme";
import { Colors } from "../../../styles/theme";

function SelectComp({ name, label, options, ...otherProps }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
    console.log(value);
  };
  const { themeMode } = UseThemMode();
  const configSelect = {
    ...otherProps,
    ...field,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel
        style={{
          color:
            meta.error && meta.touched
              ? Colors.labelError
              : themeMode == "dark"
              ? Colors.labelDark
              : Colors.labelLight,
          marginTop: "5px",
        }}
      >
        {label}
      </InputLabel>
      <Select {...configSelect}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComp;

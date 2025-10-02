import React from "react";

import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import Typography from "@mui/material/Typography";

import UseThemMode from "@hooks/use-theme";
import { helperStyle } from "@styles/error";
import { Colors } from "@styles/theme";

function SelectComp({ name, label, options, ...otherProps }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (evt) => {
    const { value } = evt.target;
    console.log(typeof value);
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
      <Select
        {...configSelect}
        style={{ color: themeMode === "dark" ? "white" : "inherit" }}
      >
        {options?.map(({ name, id, category_id }) => (
          <MenuItem key={id} value={category_id || id}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Typography component="div" sx={helperStyle}>
        {configSelect.helperText}
      </Typography>
    </FormControl>
  );
}

export default SelectComp;

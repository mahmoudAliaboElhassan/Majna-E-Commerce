import React, { useState } from "react";

import { useField, useFormikContext } from "formik";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { TextField, Typography } from "@mui/material";
import { Grid } from "@material-ui/core";

import { Colors } from "@styles/theme";
import { helperStyle } from "@styles/error";
import UseThemMode from "@hooks/use-theme";

function MultipleSelect({
  nameStore,
  nameQuantity,
  labelQuantity,
  labelStore,
  options,
  mainNameArray,
  ...otherProps
}) {
  const [formData, setFormData] = useState({
    quantity: "",
    store: "",
  });

  const [fieldStoreName, metaStoreName] = useField(nameStore);
  const [fieldQuantity, metaQuantity] = useField(nameQuantity);
  const { values, setFieldValue } = useFormikContext();
  const { themeMode } = UseThemMode();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFieldValue(name, value);

    if (name === nameStore && value) {
      setFieldValue(nameQuantity, "");
    }
  };

  const configStoreName = {
    fullWidth: true,
    variant: "outlined",
    label: labelStore,
    ...fieldStoreName,
  };

  const configQuantity = {
    fullWidth: true,
    variant: "outlined",
    label: labelQuantity,
    ...fieldQuantity,
  };

  if (metaQuantity.touched && metaQuantity.error) {
    configQuantity.error = true;
    configQuantity.helperText = metaQuantity.error;
  }

  if (metaStoreName.touched && metaStoreName.error) {
    configStoreName.error = true;
    configStoreName.helperText = metaStoreName.error;
  }

  const getOptionDisabledStatus = (value) => {
    if (mainNameArray === "inventory") {
      return values.inventory?.some((item) => item.store_pk === value);
    } else if (mainNameArray === "singleProductInventory") {
      return values.singleProductInventory?.some(
        (item) => item.store_id === value
      );
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" {...configStoreName}>
          <InputLabel
            style={{
              color:
                metaStoreName.touched && metaStoreName.error
                  ? Colors.labelError
                  : themeMode === "dark"
                  ? Colors.labelDark
                  : Colors.labelLight,
              marginTop: "5px",
            }}
          >
            {labelStore}
          </InputLabel>
          <Select
            {...configStoreName}
            id="nameSelect"
            name={nameStore}
            onChange={handleInputChange}
            style={{ color: themeMode === "dark" ? "white" : "inherit" }}
          >
            {options?.map(({ id, name }) => (
              <MenuItem
                key={id}
                value={id}
                disabled={getOptionDisabledStatus(id)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <Typography component="div" sx={helperStyle}>
            {configStoreName.helperText}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <TextField
            {...configQuantity}
            name={nameQuantity}
            onChange={handleInputChange}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default MultipleSelect;

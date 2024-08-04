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
  const { values } = useFormikContext();
  const configStoreName = {
    fullWidth: true,
    variant: "outlined",
    label: labelStore,
    // style: { width: "40%" },
    ...fieldStoreName,
  };
  const configQuantity = {
    fullWidth: true,
    variant: "outlined",
    // style: { width: "40%" },
    label: labelQuantity,
    ...fieldQuantity,
  };
  const formik = useFormikContext();
  const { themeMode } = UseThemMode();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    console.log(formData);
    if (value) {
      formik?.setFieldValue(name, +value);
    }
  };
  console.log("metaQuantity.touched");
  console.log(metaQuantity.touched);
  console.log("metaQuantity.error");
  console.log(metaQuantity.error);
  console.log("#".repeat(40));
  console.log("metaStoreName.touched");
  console.log(metaStoreName.touched);
  console.log("metaStoreName.error");
  console.log(metaStoreName.error);

  if (
    Boolean(metaQuantity.error) ||
    (metaQuantity.touched && Boolean(metaQuantity.error))
  ) {
    configQuantity.error = true;
    configQuantity.helperText = metaQuantity.error;
  }

  if (
    Boolean(metaStoreName.error) ||
    (metaStoreName.touched && Boolean(metaStoreName.error))
  ) {
    configStoreName.error = true;
    configStoreName.helperText = metaStoreName.error;
  }
  const getOptionDisabledStatus = (value) => {
    console.log("values?.mainNameArray");
    console.log(values?.mainNameArray);
    console.log(values?.mainNameArray?.some((item) => item.store_pk === value));
    if (mainNameArray === "inventory")
      return values.inventory?.some((item) => item.store_pk === value);
    else if (mainNameArray === "singleProductInventory") {
      return values.singleProductInventory?.some(
        (item) => item.store_id === value
      );
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {" "}
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" {...configStoreName}>
          <InputLabel
            style={{
              color:
                Boolean(metaStoreName.error) ||
                (metaStoreName.touched && Boolean(metaStoreName.error))
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

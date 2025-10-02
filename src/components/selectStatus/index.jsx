import React from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import UseThemMode from "@hooks/use-theme";
import { Colors } from "@styles/theme";

function SelectStatus({ options, status, handleChange, label }) {
  const { themeMode } = UseThemMode();
  const { t } = useTranslation();

  // Configure the props for the Select component dynamically
  const configSelect = {
    value: status, // Controlled value from props
    onChange: handleChange, // Function to handle change
    fullWidth: true,
    variant: "outlined",
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        id="select-status-label" // Ensure InputLabel is linked with Select
        style={{
          color: themeMode === "dark" ? Colors.labelDark : Colors.labelLight,
          marginTop: "5px",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="select-status-label" // Match labelId with InputLabel's id
        {...configSelect} // Spread the configSelect object
        style={{ color: themeMode === "dark" ? "white" : "inherit" }}
        label={t("select-status")}
      >
        {options?.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectStatus;

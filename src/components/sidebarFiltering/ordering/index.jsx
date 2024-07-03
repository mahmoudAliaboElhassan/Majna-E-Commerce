import React from "react";

import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import UseThemMode from "@hooks/use-theme";
import { helperStyle } from "@styles/error";
import { Colors } from "@styles/theme";

function Ordering({ handleOrdering }) {
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();

  return (
    <FormControl
      // fullWidth
      variant="outlined"
      style={{
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "70%",
      }}
    >
      <InputLabel
        style={{
          color: themeMode == "dark" ? Colors.labelDark : Colors.labelLight,
        }}
      >
        {t("ordering")}
      </InputLabel>
      <Select onChange={handleOrdering}>
        <MenuItem value={"price"}>{t("ascending")}</MenuItem>
        <MenuItem value={"-price"}>{t("descending")}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Ordering;

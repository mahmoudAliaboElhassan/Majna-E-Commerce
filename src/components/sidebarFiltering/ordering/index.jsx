import React from "react";

import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import Input from "@components/sidebarFiltering/input";
import UseThemMode from "@hooks/use-theme";
import { helperStyle } from "@styles/error";
import { Colors } from "@styles/theme";
import { FilteringBox } from "@styles/products";


function Ordering({ handleOrdering }) {
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();

  return (
    <FilteringBox>
      {/* <FormControl
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
      </FormControl> */}
      < Typography
        sx={{ fontSize: { xs: "15px", sm: "18px", md: "21px", lg: "24px" }, textAlign: "center" }}
        className="sidebar-title"
      >
        {t("price-ordering")}
      </ Typography>

      <Input
        handleChange={handleOrdering}
        value="price"
        title={t("ascending")}
        name="order"
      />

      <Input
        handleChange={handleOrdering}
        value="-price"
        title={t("descending")}
        name="order"
      />
    </FilteringBox >
  );
}

export default Ordering;

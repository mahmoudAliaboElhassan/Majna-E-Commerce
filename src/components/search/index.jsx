import React, { useState } from "react";

import InputBase from "@mui/material/InputBase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

import UseDirection from "@hooks/use-direction";
import { SearchIconWrapper, inputBaseStyles } from "@styles/search";

const Search = (props) => {
  const { Direction } = UseDirection();
  const { t } = useTranslation();
  const skills = ["html", "css", "javascript", "typescipt"];
  const theme = useTheme(); // Access the theme

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     [Direction.marginLeft]: "auto",
    //     width: "13%",
    //   }}
    // >
    //   <SearchIcon
    //     style={{ [Direction.marginRight]: "5px", cursor: "pointer" }}
    //   />
    <Box
      sx={{
        position: "relative",
        borderRadius: "4px", // Adjust as needed
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
        [Direction.marginLeft]: "auto",
        [Direction.marginRight]: "1",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "auto",
        },
      }}
    >
      <SearchIconWrapper>
        <SearchIcon onClick={props.onChange} />
      </SearchIconWrapper>
      {/* //   <Autocomplete
    //     freeSolo
    //     options={skills || []}
    //     onInputChange={props.onChange}
    // renderInput={(params) => (   */}
      <TextField
        onChange={props.onChange}
        fullWidth
        InputProps={{
          sx: {
            fontSize: { md: "12px", lg: "16px" },
            ...inputBaseStyles,
          },
          placeholder: t("search"),
          "aria-label": "search",
        }}
      />
      {/* )}
     /> */}
      {/* <button onClick={props.onChange}>search</button> */}
    </Box>
    // </div>
  );
};

export default React.memo(Search);

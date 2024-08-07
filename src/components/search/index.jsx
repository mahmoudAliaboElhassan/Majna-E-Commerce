import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { colors } from "@mui/material";

import UseThemeMode from "@hooks/use-theme";
import { handleSearchChange, handleSearchValue } from "@state/slices/search";
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search";
import UseProducts from "@hooks/use-products";

const Search = ({ headerColor }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { searchChange } = useSelector((state) => state.search);
  const [mysearch, setMySearch] = useState(searchChange);

  const dispatch = useDispatch();
  const { products } = UseProducts()
  const { themeMode } = UseThemeMode();

  const handleInputChange = (event, value) => {
    const inputValue = value || event.target.value;
    setMySearch(inputValue);
    dispatch(handleSearchChange(inputValue));
  };

  const handleSkillSelect = (event, value) => {
    if (value) {
      setMySearch(value);
      dispatch(handleSearchChange(value));
      dispatch(handleSearchValue(value));
    }
  };

  const handleSearchClick = () => {
    dispatch(handleSearchValue(mysearch));
  };

  const handleClearClick = () => {
    setMySearch("");
    dispatch(handleSearchChange(""));
    dispatch(handleSearchValue(""));
  };

  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        disableClearable
        options={products}
        onInputChange={handleInputChange}
        onChange={handleSkillSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            value={mysearch}  // Set the value to mysearch state
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearClick}
                    edge="start"
                    size="small"
                  >
                    <ClearIcon style={{ color: headerColor }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: { md: "12px", lg: "16px" },
                pl: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
              },
              placeholder: t("search-product"),
              "aria-label": "search",
            }}
          />
        )}
      />
      <SearchButton
        variant={themeMode === "dark" ? "contained" : "outlined"}
        onClick={handleSearchClick}
      >
        {/* {t("search")} */}
        <SearchIcon />
      </SearchButton>
    </SearchBox>
  );
};

export default React.memo(Search);

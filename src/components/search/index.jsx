import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';

import UseThemeMode from "@hooks/use-theme";
import { handleSearchChange, handleSearchValue } from "@state/slices/search";
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search";
import UseProducts from "@hooks/use-products";

const Search = ({ resetPage, headerColor }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { searchChange } = useSelector((state) => state.search);
  console.log("searchChange")
  console.log(searchChange)
  const [mysearch, setMySearch] = useState(searchChange);

  const dispatch = useDispatch();
  const { products } = UseProducts();
  const { themeMode } = UseThemeMode();

  const handleInputChange = (event, value) => {
    const inputValue = value || event.target.value;
    setMySearch(inputValue);
    dispatch(handleSearchChange(inputValue));
    if (!inputValue) {
      setMySearch("");
      dispatch(handleSearchChange(""));
      resetPage()
      dispatch(handleSearchValue(""));
    }
  };

  const handleSkillSelect = (event, value) => {
    if (value) {
      setMySearch(value);
      dispatch(handleSearchChange(value));
      resetPage()
      dispatch(handleSearchValue(value));
    }
  };

  const handleSearchClick = () => {
    resetPage()
    dispatch(handleSearchValue(mysearch));

  };

  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        options={products}
        value={searchChange}
        onInputChange={handleInputChange}
        onChange={handleSkillSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                </>
              ),
              sx: {
                fontSize: { md: "12px", lg: "16px" },
                ml: "5px",
                pl: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                '.MuiAutocomplete-endAdornment': {
                  left: theme.direction === 'rtl' ? 'unset' : "5px",
                  right: theme.direction === 'rtl' ? 0 : 'unset',
                },
                '.MuiInputBase-input': {
                  marginLeft: "15px"
                },
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
        sx={{
          backgroundColor: headerColor && (themeMode === "dark" ? theme.palette.primary.dark : "#1d1919"),
        }}
      >
        <SearchIcon />
      </SearchButton>
    </SearchBox >
  );
};

export default React.memo(Search);

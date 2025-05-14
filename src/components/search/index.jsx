import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import UseThemeMode from "@hooks/use-theme";
import UseProducts from "@hooks/use-products";
import { handleSearchChange, handleSearchValue } from "@state/slices/search";
import { setPage } from "@state/slices/page";
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search";
import { useSearchParams } from "react-router-dom";

const Search = ({ headerColor }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const { searchChange } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  console.log("searchChange");
  console.log(searchChange);
  const [mysearch, setMySearch] = useState(searchChange);

  const { products } = UseProducts();
  const { themeMode } = UseThemeMode();

  const updateSearch = (searchValue) => {
    if (searchValue === "") {
      // Create a copy of the current params as an object
      const newParams = Object.fromEntries(searchParams.entries());

      // Remove the 'search' parameter
      delete newParams.search;

      // Set the new search parameters
      setSearchParams(newParams);
    } else {
      // Update the search param
      setSearchParams({ search: searchValue });
    }
  };

  const handleInputChange = (event, value) => {
    const inputValue = value || event?.target?.value;
    setMySearch(inputValue);
    // dispatch(handleSearchChange(inputValue));
    if (!inputValue) {
      setMySearch("");
      // dispatch(handleSearchChange(""));
      dispatch(setPage(1));
      // dispatch(handleSearchValue(""));
      updateSearch("");

      if (headerColor) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const handleSkillSelect = (event, value) => {
    if (value) {
      setMySearch(value);
      // dispatch(handleSearchChange(value));
      dispatch(setPage(1));
      // dispatch(handleSearchValue(value));
      updateSearch(value);
      if (headerColor) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const handleSearchClick = () => {
    dispatch(setPage(1));
    // dispatch(handleSearchValue(mysearch));
    updateSearch(mysearch);

    if (headerColor) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  // New function to handle key press
  const handleKeyDown = (event) => {
    console.log("e.key", event.key);
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        options={products}
        value={searchParams.get("search".split("+").join(" "))}
        onInputChange={handleInputChange}
        onChange={handleSkillSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            onKeyDown={handleKeyDown} // Add onKeyDown event
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
              sx: {
                fontSize: { md: "12px", lg: "16px" },
                ml: "5px",

                pl: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create("width"),
                width: "100%",
                ".MuiAutocomplete-endAdornment": {
                  left: theme.direction === "rtl" ? "unset" : "5px",
                  right: theme.direction === "rtl" ? 0 : "unset",
                },
                ".MuiInputBase-input": {
                  marginLeft: "15px",
                },
                ".MuiAutocomplete-clearIndicator ": {
                  color: headerColor ? "white" : "inherit",
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
          backgroundColor:
            headerColor &&
            (themeMode === "dark" ? theme.palette.primary.dark : "#1d1919"),
        }}
      >
        <SearchIcon />
      </SearchButton>
    </SearchBox>
  );
};

export default React.memo(Search);

// Key Concepts of event.key
// Basic Usage: When a key is pressed, the event.key property provides the value of the key. For example, if the "Enter" key is pressed, event.key will be "Enter".

// Common Values:

// Character Keys: If the key pressed is a character key (like "A", "1", etc.), event.key will return the character itself, respecting case sensitivity (e.g., "a" or "A").
// Control Keys: For non-character keys, event.key will return the name of the key, such as "Enter", "Escape", "Tab", "ArrowUp", "ArrowDown", "Backspace", etc.
// Modifier Keys: Keys like "Shift", "Control", "Alt", and "Meta" (command key on Mac) also have corresponding values for event.key.
// Event Types:

// keydown: Fired when a key is first pressed.
// keyup: Fired when a key is released.
// keypress (deprecated): Used to be fired when a key is pressed down and held, but it's generally replaced by keydown.

// searchParams keep data as first+second

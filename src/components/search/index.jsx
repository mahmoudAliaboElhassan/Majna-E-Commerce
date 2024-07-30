import React from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import UseThemeMode from "@hooks/use-theme";
import { handleSearchChange, handleSearchValue } from "@state/slices/search";
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search";

const Search = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const skills = ["html", "css", "javascript", "typescript"];
  const dispatch = useDispatch();
  const { themeMode } = UseThemeMode()
  const { searchChange } = useSelector((state) => state.search);

  const handleInputChange = (event, value) => {
    dispatch(handleSearchChange(value || event.target.value));
  };

  const handleSkillSelect = (event, value) => {
    if (value) {
      dispatch(handleSearchChange(value));
      dispatch(handleSearchValue(value));
    }
  };

  const handleSearchClick = () => {
    dispatch(handleSearchValue(searchChange));
  };
  const handleClearClick = () => {
    dispatch(handleSearchChange(""));
  };
  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        options={skills}
        onInputChange={handleInputChange}
        onChange={handleSkillSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearClick}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: { md: "12px", lg: "16px" },
                pl: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
              },
              placeholder: t("search"),
              "aria-label": "search",
            }}
          />
        )}
      />
      <SearchButton variant={themeMode === "dark" ? "contained" : "outlined"}
        onClick={handleSearchClick}>{t('search')}</SearchButton>
    </SearchBox>
  );
};

export default React.memo(Search);

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import UseDirection from "@hooks/use-direction";
import { useDispatch, useSelector } from "react-redux";

import { handleSearchChange, handleSearchValue } from "@state/slices/search";
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search";

const Search = () => {
  const { Direction } = UseDirection();
  const { t } = useTranslation();
  const theme = useTheme();

  const skills = ["html", "css", "javascript", "typescript"];
  const dispatch = useDispatch();

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
      <SearchButton onClick={handleSearchClick}>{t('search')}</SearchButton>
    </SearchBox>
  );
};

export default React.memo(Search);

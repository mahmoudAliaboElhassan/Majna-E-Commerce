import React from "react";
import InputBase from "@mui/material/InputBase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import UseDirection from "@hooks/use-direction";
import { useDispatch, useSelector } from "react-redux";

import { handleSearchChange, handleSearchValue } from "@state/slices/search"

const SearchBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  marginRight: 1,
  flex: 1,
  borderRadius: "3px"
}));

const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  '.MuiInputBase-root': {
    color: 'inherit',
  },
}));

const SearchButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  border: 'none',
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: "3px"

}));

const Search = () => {
  const { Direction } = UseDirection();
  const { t } = useTranslation();
  const theme = useTheme();

  const skills = ["html", "css", "javascript", "typescript"];
  const dispatch = useDispatch()

  const { searchChage } = useSelector((state) => state.search)
  const handleSearch = (event) => {
    dispatch(handleSearchChange(event?.target?.value));
    console.log(searchChage);
    // setSearchParams({ queryformMahmoud: searchValue });
    // console.log(searchParams);
  };
  const handleBtnClick = () => {
    dispatch(handleSearchValue(searchChage))
  }

  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        options={skills}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            onChange={handleSearch}
            InputProps={{
              ...params.InputProps,
              sx: {
                fontSize: { md: "12px", lg: "16px" },
                pl: `calc(1em + ${theme.spacing(4)})`, // Adjust padding to match the icon
                transition: theme.transitions.create('width'),
                width: '100%',
              },
              placeholder: t("search"),
              "aria-label": "search",
            }}
          />
        )}
      />
      <SearchButton onClick={handleBtnClick}>{t('search')}</SearchButton>
    </SearchBox>
  );
};

export default React.memo(Search);

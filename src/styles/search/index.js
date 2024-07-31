import { styled, alpha } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import { Colors } from "../theme";

export const SearchBoxContainer = styled(Box)(() => {
  const { themeMode } = UseThemMode();
  return {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: themeMode === "dark" ? Colors.lightblack : Colors.primary,
    zIndex: 999,
    opacity: 0.95,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

export const SerarchField = styled(TextField)(({ theme }) => ({
  ".MuiInputLabel-root": {
    color: Colors.seconday,
  },
  ".MuiInput-root": {
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: { fontSize: "2rem" },
    color: Colors.seconday,
  },
  ".MuiInput-root::before": {
    borderBottom: `1px solid ${Colors.border}`,
  },
  padding: "0 0 0 40px",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const inputBaseStyles = {
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "8px 8px 8px 0",
    paddingLeft: "calc(1em + 32px)",
    paddingRight: "calc(1em + 32px)",
    transition: "width 200ms ease",
    width: "7ch",
    "&:focus": {
      width: "9ch",
    },
  },
};

export const SearchBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  marginRight: 1,
  flex: 1,
  borderRadius: "3px",
}));

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  ".MuiInputBase-root": {
    color: "inherit",
  },
}));

export const SearchButton = styled("button")(({ theme }) => {
  const { Direction } = UseDirection(); // Use the correct hook

  return {
    position: "absolute",
    [Direction.right]: 0, // Use the dynamic property
    height: "100%",
    top:0,
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: "none",
    borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  };
});

import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

import UseThemMode from "../../hooks/use-theme";
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

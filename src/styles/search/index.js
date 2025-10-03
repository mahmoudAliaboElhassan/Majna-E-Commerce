import { styled, alpha } from "@mui/material/styles"
import Autocomplete from "@mui/material/Autocomplete"
import { Box, Button } from "@mui/material"
import { TextField } from "@mui/material"
import IconButton from "@mui/material/IconButton"

import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import { Colors } from "../theme"

export const SearchBoxContainer = styled(Box)(() => {
  const { themeMode } = UseThemMode()
  return {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: Colors.lightblack,
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
})

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
}))

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

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
}

export const SearchBox = styled(Box)(() => {
  const { themeMode } = UseThemMode()

  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    position: "relative",
    padding: "4px",
    borderRadius: "12px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 20px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        : "0 4px 20px rgba(245, 158, 11, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    border: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.2)"
        : "rgba(245, 158, 11, 0.2)"
    }`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      boxShadow:
        themeMode === "dark"
          ? "0 6px 24px rgba(251, 191, 36, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          : "0 6px 24px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)",
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.35)"
          : "rgba(245, 158, 11, 0.35)",
    },

    "&:focus-within": {
      boxShadow:
        themeMode === "dark"
          ? "0 8px 28px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 8px 28px rgba(245, 158, 11, 0.22), inset 0 1px 0 rgba(255, 255, 255, 1)",
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.5)"
          : "rgba(245, 158, 11, 0.5)",
      transform: "translateY(-2px)",
    },
  }
})

export const StyledAutocomplete = styled(Autocomplete)(() => {
  const { themeMode } = UseThemMode()

  return {
    flex: 1,

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "transparent",
      border: "none",

      "& fieldset": {
        border: "none",
      },

      "&:hover fieldset": {
        border: "none",
      },

      "&.Mui-focused fieldset": {
        border: "none",
      },

      "& input": {
        color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
        fontSize: "15px",
        fontWeight: 500,
        padding: "12px 16px",

        "&::placeholder": {
          color: themeMode === "dark" ? "#94a3b8" : "#64748b",
          opacity: 1,
          fontWeight: 400,
        },
      },
    },

    "& .MuiAutocomplete-popupIndicator": {
      color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",

      "&:hover": {
        backgroundColor:
          themeMode === "dark"
            ? "rgba(251, 191, 36, 0.1)"
            : "rgba(245, 158, 11, 0.1)",
      },
    },

    "& .MuiAutocomplete-clearIndicator": {
      color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",

      "&:hover": {
        backgroundColor:
          themeMode === "dark"
            ? "rgba(251, 191, 36, 0.1)"
            : "rgba(245, 158, 11, 0.1)",
      },
    },
  }
})

export const SearchButton = styled(Button)(() => {
  const { themeMode } = UseThemMode()

  return {
    minWidth: "56px",
    height: "56px",
    padding: "0",
    borderRadius: "10px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    border: "none",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 12px rgba(251, 191, 36, 0.3)"
        : "0 4px 12px rgba(245, 158, 11, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
          : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow:
        themeMode === "dark"
          ? "0 6px 20px rgba(251, 191, 36, 0.45)"
          : "0 6px 20px rgba(245, 158, 11, 0.45)",
      border: "none",
    },

    "&:hover::before": {
      opacity: 1,
    },

    "&:active": {
      transform: "scale(0.98)",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "24px",
      position: "relative",
      zIndex: 1,
    },
  }
})

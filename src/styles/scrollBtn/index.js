import { IconButton } from "@material-ui/core"
import { styled } from "@mui/material/styles"

import { Colors } from "../theme"
export const NoonScrollButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
  color: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(251, 191, 36, 0.4), 0 0 0 4px rgba(251, 191, 36, 0.1)"
      : "0 4px 20px rgba(245, 158, 11, 0.3), 0 0 0 4px rgba(245, 158, 11, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `2px solid ${theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b"}`,
  backdropFilter: "blur(8px)",

  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#f59e0b" : "#d97706",
    transform: "translateY(-4px) scale(1.05)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 28px rgba(251, 191, 36, 0.5), 0 0 0 6px rgba(251, 191, 36, 0.15)"
        : "0 8px 28px rgba(245, 158, 11, 0.4), 0 0 0 6px rgba(245, 158, 11, 0.12)",
  },

  "&:active": {
    transform: "translateY(-2px) scale(1.02)",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "28px",
    transition: "transform 0.3s ease",
  },

  "&:hover .MuiSvgIcon-root": {
    transform: "translateY(-2px)",
  },
}))

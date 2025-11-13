import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { Link } from "react-router-dom"

import { Colors } from "@styles/theme"
import UseThemMode from "@hooks/use-theme"

export const IntroudctoryButton = styled(Link)(() => {
  const { themeMode } = UseThemMode()
  const theme = useTheme()

  return {
    display: "inline-flex",
    padding: "12px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "1rem",
    marginBottom: "1rem",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "15px",
    position: "relative",
    overflow: "hidden",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    border: "none",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 12px rgba(251, 191, 36, 0.25)"
        : "0 4px 12px rgba(245, 158, 11, 0.25)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&::before": {
      content: "''",
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
      zIndex: -1,
    },

    "&:hover": {
      color:"white",
      transform: "translateY(-2px)",
      boxShadow:
        themeMode === "dark"
          ? "0 6px 20px rgba(251, 191, 36, 0.4)"
          : "0 6px 20px rgba(245, 158, 11, 0.4)",
    },

    "&:hover::before": {
      opacity: 1,
    },

    "&:hover .icon": {
      transform:
        theme.direction === "ltr" ? "translateX(4px)" : "translateX(-4px)",
    },

    "&:active": {
      transform: "translateY(0px)",
      boxShadow:
        themeMode === "dark"
          ? "0 2px 8px rgba(251, 191, 36, 0.3)"
          : "0 2px 8px rgba(245, 158, 11, 0.3)",
    },

    "& .icon": {
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }
})

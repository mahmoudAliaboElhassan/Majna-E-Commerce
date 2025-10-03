import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { Card } from "@mui/material"

import { Colors } from "@styles/theme"
import UseThemMode from "@hooks/use-theme"

export const StyledLinkItem = styled(Link)(({ isActive }) => {
  const { themeMode } = UseThemMode()
  return {
    position: "relative",
    paddingBottom: "8px",
    overflow: "hidden",
    fontWeight: isActive ? 700 : 500,
    color: themeMode == "dark" ? "white" : "black !important",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-block",

    "&::after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: isActive ? "100%" : "0%",
      height: "3px",
      background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
      borderRadius: "2px",
      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 2px 8px rgba(251, 191, 36, 0.3)",
    },

    "&:hover": {
      color: "#fbbf24 ",
      transform: "translateY(-2px)",
    },

    "&:hover::after": {
      width: "100%",
    },
  }
})

export const CardFooter = styled(Card)(() => {
  const { themeMode } = UseThemMode()

  return {
    padding: "20px 24px",
    textAlign: "center",
    marginTop: "20px",
    borderRadius: "12px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
    boxShadow:
      themeMode === "dark"
        ? "0 4px 16px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        : "0 4px 16px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

    "&::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: 0,
      height: 0,
      borderRadius: "50%",
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #2d3f5f 0%, #1e293b 100%)"
          : "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 100%)",
      transition:
        "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: -1,
    },

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow:
        themeMode === "dark"
          ? "0 8px 24px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          : "0 8px 24px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)",
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.3)"
          : "rgba(245, 158, 11, 0.3)",
    },

    "&:hover::before": {
      width: "200%",
      height: "200%",
    },

    "& *": {
      position: "relative",
      zIndex: 2,
    },
  }
})

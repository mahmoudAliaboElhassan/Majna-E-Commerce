import { Tabs, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { IconButton } from "@mui/material"
import "@fontsource/montez"
import { motion } from "framer-motion"

import { Colors } from "../theme"
import UseThemeMode from "@hooks/use-theme"

export const AppbarHeader = styled(motion.div)(({ theme }) => ({
  padding: "2px",
  flexGrow: 1,
  fontFamily: '"Montez","cursive"',
  color: theme.palette.mode === "dark" ? "#fbbf24" : "white",
  textAlign: "center",
  fontSize: "2.25em",
  fontStyle: "italic",
}))

export const CartNumber = styled(Typography)(() => ({
  position: "absolute",
  top: "-15%",
  fontSize: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: 700,
  background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  color: "#ffffff",
  borderRadius: "50%",
  width: "22px",
  height: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
  border: "2px solid #ffffff",
}))

export const TabsElementsList = styled(Tabs)(() => ({
  marginRight: "auto",
  marginLeft: "auto",
}))

export const DrawerCloseIcon = styled(IconButton)(() => {
  const { themeMode } = UseThemeMode()

  return {
    position: "absolute",
    bottom: "24px",
    left: "50%",
    zIndex: 999999,
    transform: "translateX(-50%)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 12px rgba(251, 191, 36, 0.4)"
        : "0 4px 12px rgba(245, 158, 11, 0.4)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      transform: "translateX(-50%) scale(1.1)",
      boxShadow:
        themeMode === "dark"
          ? "0 6px 16px rgba(251, 191, 36, 0.5)"
          : "0 6px 16px rgba(245, 158, 11, 0.5)",
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
          : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "24px",
    },
  }
})

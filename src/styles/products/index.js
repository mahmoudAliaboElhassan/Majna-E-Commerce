import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { Button, Typography } from "@material-ui/core"

import UseThemMode from "../../hooks/use-theme"
import { Colors } from "../theme"
import UseMediaQueryHook from "@hooks/use-media-query"

export const ProducDetailWrapper = styled(Box)(({ theme, matches }) => ({
  display: "flex",
  padding: theme.spacing(4),
  flexDirection: "column", // Adjust as needed
}))
export const ProducDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
  textAlign: "center",
}))
export const StoreAdded = styled(Button)(() => ({
  borderRadius: "8px",
  background: "#160d203b",
  color: "white",
  border: "1px solid white",
  justifyContent: "center",
  width: "fit-content",
  boxShadow: "0px 0px 6px 1px #7f4949",
  fontWeight: "700",
}))
export const NoCount = styled(Typography)(() => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  fontSize: "22px",
  textAlign: "center",
}))
export const NoCountContainer = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100vh",
}))

export const DrawerButton = styled("button")(() => {
  const { themeMode } = UseThemMode()
  return {
    backgroundColor: themeMode === "dark" ? Colors.lightblack : Colors.primary,
    color: Colors.white,
    minHeight: "100vh",
  }
})
export const FilteringBox = styled(Box)(() => {
  const { themeMode } = UseThemMode()
  const { isMatch } = UseMediaQueryHook()

  return {
    padding: "16px",
    width: "100%",
    marginTop: "20px",
    borderRadius: "12px",
    // background:
    //   themeMode === "dark"
    //     ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
    //     : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 16px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
        : "0 2px 12px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    border:
      themeMode === "dark"
        ? "1px solid rgba(251, 191, 36, 0.15)"
        : "1px solid rgba(245, 158, 11, 0.12)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        themeMode === "dark"
          ? "0 6px 20px rgba(251, 191, 36, 0.15)"
          : "0 4px 16px rgba(245, 158, 11, 0.12)",
      transform: "translateY(-2px)",
    },
  }
})

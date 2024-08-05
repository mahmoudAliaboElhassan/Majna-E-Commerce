import styled from "@emotion/styled";
import { Box } from "@mui/material";

import UseThemMode from "../../hooks/use-theme";
import { Colors } from "../theme";

export const ProducDetailWrapper = styled(Box)(({ theme, matches }) => ({
  display: "flex",
  padding: theme.spacing(4),
  flexDirection: "column", // Adjust as needed
}));
export const ProducDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
  textAlign: "center",
}));

export const DrawerButton = styled("button")(() => {
  const { themeMode } = UseThemMode();
  return {
     backgroundColor: themeMode === "dark" ? Colors.lightblack : Colors.primary,
    color: Colors.white,
    minHeight:"100vh"
  };
});

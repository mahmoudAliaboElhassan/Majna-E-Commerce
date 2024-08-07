import styled from "@emotion/styled";
import { Box } from "@mui/material";
import {  Button } from "@material-ui/core";

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
export const StoreAdded = styled(Button)(() => ({
    borderRadius: "8px",
    background: "#160d203b",
    color: "white",
    border: "1px solid white",
    justifyContent: "center",
    width: "fit-content",
    boxShadow: "0px 0px 6px 1px #7f4949",
    fontWeight: "700",
}));

export const DrawerButton = styled("button")(() => {
  const { themeMode } = UseThemMode();
  return {
     backgroundColor: themeMode === "dark" ? Colors.lightblack : Colors.primary,
    color: Colors.white,
    minHeight:"100vh"
  };
});

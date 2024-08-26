import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Button, Typography } from "@material-ui/core";

import UseThemMode from "../../hooks/use-theme";
import { Colors } from "../theme";
import UseMediaQueryHook from "@hooks/use-media-query";

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
export const NoCount = styled(Typography)(() => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  fontSize: "22px",
  textAlign: "center",
}));
export const NoCountContainer = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100vh",
}));

export const DrawerButton = styled("button")(() => {
  const { themeMode } = UseThemMode();
  return {
    backgroundColor: themeMode === "dark" ? Colors.lightblack : Colors.primary,
    color: Colors.white,
    minHeight: "100vh",
  };
});
export const FilteringBox = styled(Box)(() => {
  const { themeMode } = UseThemMode();
  const { isMatch } = UseMediaQueryHook();

  return {
    padding: "10px 5px",
    width: isMatch ? "90%" : "80%",
    marginTop: "20px",
    borderRadius: "10% 10% 10% 10% / 10% 10% 10% 10%",
    background: themeMode === "dark" ? "rgb(35 23 23 / 40%)" : "#eee",
    boxShadow:
      themeMode === "dark"
        ? "rgb(140 144 205 / 37%) -1px 3px 7px 1px"
        : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(2px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
});

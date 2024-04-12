import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";

import { Colors } from "../theme";
import UseThemMode from "../../hooks/use-theme";

export const StyledLinkItem = styled(Link)(() => ({
  position: "relative",
  paddingBottom: "8px",
  overflow: "hidden",
  "&::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "4px",
    backgroundColor: Colors.white,
    transition: "width 0.4s ease",
  },

  "&:hover": {
    // backgroundColor: "#2c2c2c",
    // padding: "4px",
    color: Colors.white,
  },
  "&:hover::after": {
    width: "100%",
  },
}));
export const CardFooter = styled(Card)(() => {
  const { themeMode } = UseThemMode();
  return {
    padding: "16px",
    textAlign: "center",
    marginTop: "16px",
    borderRadius: "4px",
    backgroundColor: themeMode === "dark" ? "#121212" : Colors.primary,
    position: "relative",
    zIndex:'999',
    "&::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      width: 0,
      height: 0,
      borderRadius: "18px",
      backgroundColor:
        themeMode === "dark"
          ? "#1a1a1a" // Increase the degree of dark color by adjusting RGB values
          : "#6f1a38", // Increase the degree of light color by adjusting RGB values
      transition: "0.3s",
    },
    "&:hover::before": {
      width: "100%",
      height: "100%",
    },
  };
});

import { Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconButton } from "@material-ui/core";
import "@fontsource/montez";
import { motion } from "framer-motion";

import { Colors } from "../theme";

export const AppbarHeader = styled(motion.div)(() => ({
  fontSize: "2em",
  padding: "2px",
  flexGrow: 1,
  fontFamily: '"Montez","cursive"',
  color: Colors.seconday,
  textAlign: "center",
  cursor: "pointer",
}));
export const CartNumber = styled(Typography)(() => ({
  position: "absolute",
  top: "-15%",
  fontSize: " 18px",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: 700,
  color: Colors.white,
}));

export const tabsElementsList = styled(Tabs)(() => ({
  marginRight: "auto",
  marginLeft: "auto",
}));
export const DrawerCloseIcon = styled(IconButton)(() => ({
  position: "absolute",
  left: "50%",
  top: "65%",
  zIndex: "999999",
  transform: "translateX(-50%)",
  fontSize: "15px",
  color: Colors.white,
}));

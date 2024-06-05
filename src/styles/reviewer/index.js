import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { Card } from "@mui/material";

import UseDirection from "@hooks/use-direction";
import UseThemMode from "@hooks/use-theme";
import { Colors } from "@styles/theme";

const drawerWidth = 240;

export const MainBody = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { Direction } = UseDirection();

  return {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [Direction.marginLeft]: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [Direction.marginLeft]: 0,
    }),
  };
});

export const AppBarReviwer = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { Direction } = UseDirection();

  return {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      // width: `calc(100% - ${drawerWidth}px)`,
      // [Direction.marginLeft]: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DrawerContainer = styled(Drawer)(() => {
  const { themeMode } = UseThemMode();

  return {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundColor:
        themeMode === "dark" ? Colors.lightblack : Colors.primary,
      zIndex: 2,
      color: Colors.white,
      marginTop: "50px",
    },
  };
});
export const PdfContainer = styled(Card)(({ theme }) => {
  const { themeMode } = UseThemMode();
  return {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${
      themeMode == "dark" ? Colors.light_gray : Colors.shaft
    }`,
    borderRadius: "8px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  };
});

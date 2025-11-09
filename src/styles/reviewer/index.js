import { styled } from "@mui/material/styles"
import MuiAppBar from "@mui/material/AppBar"
import Drawer from "@mui/material/Drawer"
import {
  Box,
  Card,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material"

import UseDirection from "@hooks/use-direction"
import UseThemMode from "@hooks/use-theme"
import { Colors } from "@styles/theme"

const drawerWidth = 240

export const MainBody = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { Direction } = UseDirection()

  return {
    flexGrow: 1,
    overflow: "auto",
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
  }
})

export const AppBarReviwer = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { Direction } = UseDirection()

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
  }
})

export const DrawerContainer = styled(Drawer)(() => {
  const { Direction } = UseDirection()
  const { themeMode } = UseThemMode()

  return {
    "& .MuiDrawer-paper": {
      width: 280,
      borderTopRightRadius: Direction.direction === "rtl" ? 0 : "24px",
      borderBottomRightRadius: Direction.direction === "rtl" ? 0 : "24px",
      borderTopLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
      borderBottomLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
      border: `1px solid ${
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.15)"
          : "rgba(245, 158, 11, 0.15)"
      }`,
      background:
        themeMode === "dark"
          ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      boxShadow:
        themeMode === "dark"
          ? "0 8px 32px rgba(251, 191, 36, 0.2)"
          : "0 8px 32px rgba(245, 158, 11, 0.15)",
      maxWidth: "100%",
      height: "100%",
      zIndex: 1300,
    },
  }
})

export const DrawerHeader = styled(Box)(() => {
  const { themeMode } = UseThemMode()

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    minHeight: "64px",
    background:
      themeMode === "dark"
        ? "rgba(30, 41, 59, 0.6)"
        : "rgba(248, 250, 252, 0.8)",
    borderBottom: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
  }
})

export const StyledListItemButton = styled(ListItemButton)(({ isActive }) => {
  const { themeMode } = UseThemMode()

  return {
    margin: "6px 12px",
    borderRadius: "10px",
    padding: "12px 16px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: isActive
      ? themeMode === "dark"
        ? "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)"
        : "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)"
      : "transparent",
    border: `1px solid ${
      isActive
        ? themeMode === "dark"
          ? "rgba(251, 191, 36, 0.3)"
          : "rgba(245, 158, 11, 0.3)"
        : "transparent"
    }`,

    "&:hover": {
      // background:
      // themeMode === "dark"
      //   ? "rgba(251, 191, 36, 0.1)"
      //   : "rgba(245, 158, 11, 0.08)",
      transform: "translateX(4px)",
      boxShadow:
        themeMode === "dark"
          ? "0 2px 8px rgba(251, 191, 36, 0.15)"
          : "0 2px 8px rgba(245, 158, 11, 0.12)",
    },
  }
})

export const StyledListItemText = styled(ListItemText)(({ isActive }) => {
  const { themeMode } = UseThemMode()

  return {
    "& .MuiTypography-root": {
      color: isActive
        ? themeMode === "dark"
          ? "#fbbf24"
          : "#f59e0b"
        : themeMode === "dark"
        ? "#f1f5f9"
        : "#0f172a",
      fontWeight: isActive ? 700 : 500,
      fontSize: "15px",
      transition: "all 0.3s ease",
    },
  }
})

export const CloseButton = styled(IconButton)(() => {
  const { themeMode } = UseThemMode()

  return {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      transform: "scale(1.1) rotate(90deg)",
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
          : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      boxShadow:
        themeMode === "dark"
          ? "0 4px 12px rgba(251, 191, 36, 0.4)"
          : "0 4px 12px rgba(245, 158, 11, 0.4)",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "24px",
    },
  }
})
export const PdfContainer = styled(Card)(({ theme }) => {
  const { themeMode } = UseThemMode()
  return {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${
      themeMode == "dark" ? Colors.light_gray : Colors.shaft
    }`,
    borderRadius: "8px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
})

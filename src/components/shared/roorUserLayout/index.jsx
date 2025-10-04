import { useCallback, useState } from "react"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { Outlet } from "react-router-dom"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useTheme } from "@emotion/react"
import { styled } from "@mui/material/styles"

import MainDrawer from "@components/shared/mainDrawer"
import UseThemeMode from "@hooks/use-theme"

const drawerWidth = 280

const DrawerButton = styled(Box)(() => {
  const { themeMode } = UseThemeMode()
  const theme = useTheme()

  return {
    position: "fixed",
    [theme.direction === "rtl" ? "right" : "left"]: "0",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1200,
    width: "48px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderTopRightRadius: theme.direction === "rtl" ? 0 : "12px",
    borderBottomRightRadius: theme.direction === "rtl" ? 0 : "12px",
    borderTopLeftRadius: theme.direction === "rtl" ? "12px" : 0,
    borderBottomLeftRadius: theme.direction === "rtl" ? "12px" : 0,
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "#ffffff",
    boxShadow:
      themeMode === "dark"
        ? "0 4px 16px rgba(251, 191, 36, 0.4)"
        : "0 4px 16px rgba(245, 158, 11, 0.4)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      width: "56px",
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
          : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
      boxShadow:
        themeMode === "dark"
          ? "0 6px 20px rgba(251, 191, 36, 0.5)"
          : "0 6px 20px rgba(245, 158, 11, 0.5)",
    },

    "& .MuiSvgIcon-root": {
      fontSize: "28px",
    },
  }
})

const MainBody = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const { themeMode } = UseThemeMode()

  return {
    flexGrow: 1,
    padding: "24px",
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    marginLeft: open ? `${drawerWidth}px` : 0,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
      width: "100%",
      marginLeft: 0,
    },
    minHeight: "calc(100vh - 64px)",
    background:
      themeMode === "dark"
        ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
  }
})

function RootUserLayout({ links }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  const handleDrawerOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleDrawerClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        top: "-25px",
        overflow: "hidden",
        marginBottom: "-25px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {!open && (
          <DrawerButton onClick={handleDrawerOpen}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </DrawerButton>
        )}

        <MainDrawer
          open={open}
          handleClose={handleDrawerClose}
          elements={links}
        />

        <MainBody open={open}>
          <Outlet />
        </MainBody>
      </Box>
    </Box>
  )
}

export default RootUserLayout

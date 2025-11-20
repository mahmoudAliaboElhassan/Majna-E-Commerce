import { useEffect } from "react"
import { useTheme, CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { StylesProvider, jssPreset } from "@mui/styles"
import { create } from "jss"
import rtl from "jss-rtl"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import AOS from "aos"
import "aos/dist/aos.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ScrollToTopButton from "@components/scroll"
import Header from "@components/header"
import UseDirection from "@hooks/use-direction"
import { handlelogOutState } from "@state/slices/auth"
import LoadingFetching from "@components/loadingFetching"
import SocketIODemo from "../hooks/use-socket"

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
})

function RootLayout() {
  const { t } = useTranslation()
  const { Direction } = UseDirection()
  const { mymode } = useSelector((state) => state.mode)
  const { expireToken, token, role, loadingLogOut } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    })
    AOS.refresh()
  }, [t, mymode])

  useEffect(() => {
    document.title = t("website-title")

    const expired = new Date(expireToken).getTime()
    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      if (token && role) {
        if (currentTime >= expired) {
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          localStorage.removeItem("expired")
          localStorage.removeItem("userId")
          dispatch(handlelogOutState())
          clearInterval(interval)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [t])

  const thema = createTheme({
    direction: Direction.direction,
    palette: {
      primary: {
        main: mymode === "dark" ? "#fbbf24" : "#f59e0b",
        light: mymode === "dark" ? "#fcd34d" : "#fbbf24",
        dark: mymode === "dark" ? "#f59e0b" : "#d97706",
      },
      secondary: {
        main: mymode === "dark" ? "#60a5fa" : "#3b82f6",
        light: mymode === "dark" ? "#93c5fd" : "#60a5fa",
        dark: mymode === "dark" ? "#3b82f6" : "#2563eb",
      },
      mode: mymode,
      background: {
        default: mymode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mymode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mymode === "dark" ? "#f1f5f9" : "#0f172a",
        secondary: mymode === "dark" ? "#cbd5e1" : "#475569",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          contained: {
            background:
              mymode === "dark"
                ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "#ffffff",
            fontWeight: 600,
            "&:hover": {
              background:
                mymode === "dark"
                  ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
                  : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
            },
          },
          outlined: {
            borderColor: mymode === "dark" ? "#fbbf24" : "#f59e0b",
            color: mymode === "dark" ? "#fbbf24" : "#f59e0b",
            fontWeight: 600,
            "&:hover": {
              borderColor: mymode === "dark" ? "#fcd34d" : "#d97706",
              backgroundColor:
                mymode === "dark"
                  ? "rgba(251, 191, 36, 0.08)"
                  : "rgba(245, 158, 11, 0.08)",
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              mymode === "dark"
                ? "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
                : "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
            backgroundAttachment: "fixed",
          },
        },
      },
    },
  })

  const mainContentStyle = {
    minHeight: "100vh",
    background:
      mymode === "dark"
        ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
    transition: "all 0.3s ease",
  }

  const overlayStyle = {
    opacity: loadingLogOut ? "0.3" : "1",
    position: "relative",
    overflow: loadingLogOut ? "hidden" : "auto",
    pointerEvents: loadingLogOut ? "none" : "auto",
    userSelect: loadingLogOut ? "none" : "auto",
    transition: "opacity 0.3s ease",
  }

  const loadingOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      mymode === "dark"
        ? "rgba(15, 23, 42, 0.85)"
        : "rgba(248, 250, 252, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    transition: "all 0.3s ease",
  }

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={thema}>
        <CssBaseline />
        <div style={mainContentStyle}>
          <div style={overlayStyle}>
            <Header />
            <div style={{ height: "20px" }}></div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={Direction.direction === "rtl"}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={mymode === "dark" ? "dark" : "light"}
              toastStyle={{
                background: mymode === "dark" ? "#1e293b" : "#ffffff",
                color: mymode === "dark" ? "#f1f5f9" : "#0f172a",
                border: `1px solid ${
                  mymode === "dark"
                    ? "rgba(251, 191, 36, 0.2)"
                    : "rgba(245, 158, 11, 0.2)"
                }`,
                boxShadow:
                  mymode === "dark"
                    ? "0 4px 12px rgba(251, 191, 36, 0.1)"
                    : "0 4px 12px rgba(245, 158, 11, 0.1)",
              }}
            />
            <Outlet />
          </div>
          {loadingLogOut && (
            <div style={loadingOverlayStyle}>
              <LoadingFetching>{t("wait-logout")}</LoadingFetching>
            </div>
          )}
          <ScrollToTopButton />
        </div>
        {/* <SocketIODemo /> */}
      </ThemeProvider>
    </StylesProvider>
  )
}

export default RootLayout

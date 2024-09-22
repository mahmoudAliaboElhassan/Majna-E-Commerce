import { useEffect } from "react";
import { useTheme, CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  NavigateBefore,
  PhotoCamera,
} from "@mui/icons-material";
import { StylesProvider, jssPreset } from "@mui/styles";
import styled from "@emotion/styled";
import { create } from "jss";
import rtl from "jss-rtl";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScrollToTopButton from "@components/scroll";
import Header from "@components/header";
import Footer from "@components/footer";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";
import { logOut, handlelogOutState } from "@state/slices/auth";
import LoadingFetching from "@components/loadingFetching";


// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RootLayout() {
  const { t } = useTranslation();
  const { Direction } = UseDirection();
  const { mymode } = useSelector((state) => state.mode);
  const { expireToken, token, role, loadingLogOut } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = t("website-title");
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
    });

    const expired = new Date(expireToken).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (token && role) {
        if (currentTime >= expired) {
          // dispatch(logOut())
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("expired");
          dispatch(handlelogOutState())
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [t]);

  const thema = createTheme({
    direction: Direction.direction,
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.seconday,
      },
      mode: mymode,
      background: {
        default: mymode === "dark" ? "#272727" : "#FFFFFF",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
      },
    },
  });

  const Item = styled("div")({
    color: "blue",
    minHeight: 100,
    minWidth: 100,
    backgroundColor: "red",
  });

  const styleBox = {
    backgroundColor: "green",
    color: "red",
    transition: "5s",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  };

  const theme = useTheme();
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={thema}>
        <CssBaseline />
        <div style={{ opacity: loadingLogOut ? "0.2" : "1", position: "relative", overflow: loadingLogOut ? "hidden" : "auto", pointerEvents: loadingLogOut ? "none" : "auto", userSelect: loadingLogOut ? "none" : "auto" }}>
          <Header />
          <div style={{ height: "20px" }}></div>
          <ToastContainer />
          <Outlet />
        </div>
        {loadingLogOut && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <LoadingFetching>{t('wait-logout')}</LoadingFetching>
          </div>
        )}
        <ScrollToTopButton />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default RootLayout;

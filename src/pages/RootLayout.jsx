import { useEffect, useState } from "react";

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

import ScrollToTopButton from "@components/scroll";
import Header from "@components/header";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";
import { logOut } from "@state/slices/auth";

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RootLayout() {
  const { t } = useTranslation();
  const { Direction } = UseDirection();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mymode } = useSelector((state) => state.mode);
  const { expireToken, token, role } = useSelector((state) => state.auth);
  useEffect(() => {
    document.title = t("website-title");
    AOS.init({
      // disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    const value = "mahmoud";

    const expired = new Date(expireToken).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();

      if (token && role) {
        if (currentTime >= expired) {
          console.log("expired");

          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("expired");
          clearInterval(interval);
        } else {
          // console.log("not yet");
        }
      } else {
        // console.log("not user");
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [t]); // Removed localStorage from the dependency array since it's not allowed

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
  // const classes = useStyles();
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
        <Header /> <div style={{ height: "20px" }}></div>
        <Outlet />
        {/* <Container maxWidth="sm"> 
            <Paper square={false} elevation={24}>
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ⌘X
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ⌘C
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ⌘V
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
            <Box>
              <Typography>1</Typography>
              <Typography>2</Typography>
              <Typography>3</Typography>
            </Box>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              direction={matches ? "column" : "row"}
            >
              <Grid item>
                <Item>Hello, this is a styled component!</Item>
                <Divider variant="middle" component="li" />
              </Grid>
              <Grid item>
                <Item>Hello, this is a styled component!</Item>
                <Divider variant="inset" component="li" light={false} />
              </Grid>
              <Grid item>
                <Item>One</Item>
              </Grid>
              <Grid item>
                <Item>Two</Item>
              </Grid>
              <Grid item>
                <Item>Three</Item>
              </Grid>
              <Grid item>
                <Item>Three</Item>
              </Grid>
              <Grid item>
                <Item>Three</Item>
              </Grid>
              <Grid item>
                <Item>Three</Item>
              </Grid>
            </Grid> 
            <h1 className={`${classes.el} ${classes.bl}`}>17</h1>
            <Button variant="contained" color="primary">
              Button
            </Button>
            {/* <ReactBootstrap /> 
            <Routes>
              <Route path="go" element={<div>hello</div>} />
            </Routes>
            <MuiLink to="go" component={Link} variant="button">
              go
            </MuiLink>
          </Container>*/}
        {/* <Grid
            container
            justifyContent="center"
            align-items="center"
            sx={{ bgcolor: "green", w: 50, h: 50 }}
          >
            <Grid item>
              <CircularProgress color="secondary" size={120} />
            </Grid>
          </Grid>{" "}
          <Motion2 /> */}
        {/* <GetProducts /> */}
        {/* <BasicModal /> */}
        {/* <Switch
            checked={localStorage.getItem("mode") === "true" ? true : false}
            onChange={() => {
              localStorage.setItem(
                "mode",
                localStorage.getItem("mode") == "false" ? true : false
              );
              setDarkMode(
                localStorage.getItem("mode") == "true" ? true : false
              );
            }}
          /> */}
        {/* <MotionComp /> */}
        {/* <div style={{ color: "textSecondary" }}>helloo </div> */}
        {/* <FormPropsTextFields /> */}
        {/* <Loader /> */}
        {/* <div>{t("about")}</div> */}
        {/* </> */}
        {/* <FormAuth theme={thema} /> */}
        {/* {
          (window.onscroll = () => {
            console.log("scrolled");
            window.scrollY > 100 ? (
              <IconButton
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ position: "fixed", bottom: "20px", right: "16px" }}
              >
                Up
              </IconButton>
            ) : null;
          })
        } */}
        <ScrollToTopButton />
        {/* <PdfViewer /> */}
      </ThemeProvider>
    </StylesProvider>
  );
}

export default RootLayout;

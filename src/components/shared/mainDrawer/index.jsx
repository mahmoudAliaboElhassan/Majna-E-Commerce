import React, { useState } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { DrawerHeader, DrawerContainer } from "@styles/reviewer";
import UseDirection from "@hooks/use-direction";
import UseThemMode from "@hooks/use-theme";
import { Colors } from "@styles/theme";

function MainDrawer({ open, handleClose, elements }) {
  const { Direction } = UseDirection();
  const theme = useTheme();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const location = useLocation();
  const path = location.pathname;
  const searchText = "/distributor-control-panel/";

  const result = path.slice(searchText.length);
  console.log("result");
  console.log(result);

  const [activeLink, setActiveLink] = useState(result || "");
  console.log(location.pathname);
  const handleClick = (to) => setActiveLink(to || "");
  const DrawerTheme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 250,
            [Direction.borderTopRightRadius]: "100px",
            [Direction.borderRight]: "1px solid #100e0e",
            maxWidth: "100%",
            backgroundColor:
              themeMode === "dark" ? Colors.lightblack : Colors.primary,
            height: "100%",
            zIndex: 2,
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={DrawerTheme}>
      <DrawerContainer anchor={Direction.left} variant="persistent" open={open}>
        <List
          sx={{
            backgroundColor:
              themeMode === "dark" ? Colors.lightblack : Colors.primary,
            height: "100vh",
            zIndex: 2,
          }}
        >
          <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {elements?.map((el, index) => (
            <ListItem
              key={el.label}
              disablePadding
              onClick={() => handleClick(el.to)}
            >
              <ListItemButton {...el} component={Link}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={el.label}
                  style={{
                    color: activeLink === el.to ? "bold" : "normal",
                    borderBottom:
                      activeLink === el.to ? "2px solid white" : "none",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </DrawerContainer>
    </ThemeProvider>
  );
}

export default MainDrawer;

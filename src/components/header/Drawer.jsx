import React, { useCallback, useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  List,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
// import { ReactComponent as ShoppingCart } from "../shopping-cart.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SlideSearch from "@components/Slide";
import ModalSignup from "@components/Modal";
import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import UseToggle from "@hooks/use-toggle";
import { activate } from "@state/slices/active";
import { CartNumber, DrawerCloseIcon } from "@styles/appbar";

function DrawerComponent({ drawerElements }) {
  const [active, setActive] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [open_modal, toggle] = UseToggle(false);
  const { t } = useTranslation();
  const { Direction } = UseDirection();
  const { themeMode } = UseThemMode();
  const { token } = useSelector((state) => state.auth);
  const closeModal = useCallback(() => toggle(false), []);
  const closeSearch = useCallback(() => setShowSearch(false), []);
  const dispatch = useDispatch();
  const handleClick = (element, index, array) => {
    dispatch(activate(element.to));
    setOpenDrawer(false);

    if (index === array.length - 1) {
      if (token) {
        element.click?.();
      } else {
        toggle();
      }
    }
  };

  const handleSearchButton = () => {
    setShowSearch(true);
    setOpenDrawer(false);
  };

  useEffect(() => {
    console.log(document.documentElement.dir);
  }, [document.documentElement.dir]);
  const DrawerTheme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 250,
            [Direction.borderTopRightRadius]: "100px",
            [Direction.borderRight]: "1px solid #100e0e",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={DrawerTheme}>
      <AnimatePresence initial={false}>
        {!openDrawer && (
          <IconButton sx={{ color: "white" }}>
            <MenuIcon onClick={() => setOpenDrawer(true)} />
          </IconButton>
        )}

        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor={Direction.left}
          style={{
            height: "100vh",
          }}
        >
          <DrawerCloseIcon onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </DrawerCloseIcon>
          <List
            sx={{
              backgroundColor:
                themeMode === "dark" ? Colors.lightblack : Colors.primary,
              height: "100vh",
              zIndex: 2,
            }}
          >
            {" "}
            <ListItemButton
              onClick={() => setOpenDrawer(false)}
              sx={{ [Direction.marginRight]: "50px" }}
            >
              <IconButton>
                <ShoppingCartIcon
                  sx={{
                    fontSize: "2rem",
                    color: "white",
                  }}
                />
                <CartNumber>1</CartNumber>
              </IconButton>{" "}
            </ListItemButton>{" "}
            <ListItemButton onClick={handleSearchButton}>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  {t("search")}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider color="white" variant="middle" />
            {drawerElements?.map((el, idx, array) => (
              <ListItemButton
                {...el}
                key={idx}
                component={Link}
                onClick={() => handleClick(el, idx, array)}
              >
                <ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={el.label} />
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <ModalSignup open_modal={open_modal} close={closeModal} />
        <SlideSearch
          show={showSearch}
          dir={Direction.right}
          close={closeSearch}
        />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default DrawerComponent;

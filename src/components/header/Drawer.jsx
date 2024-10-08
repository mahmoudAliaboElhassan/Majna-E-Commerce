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

import SlideSearch from "@components/slide";
import ModalSignup from "@components/modal";
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
  const { token, role } = useSelector((state) => state.auth);
  const { countOfCartItems } = useSelector((state) => state.cart);

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
            width: 200,
            // padding: 10 40,
            [Direction.borderTopRightRadius]: "100px",
            [Direction.borderRight]: "1px solid #100e0e",
            backgroundColor:
              themeMode === "dark" ? Colors.lightblack : Colors.primary,
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={DrawerTheme}>
      <AnimatePresence initial={false}>
        {!openDrawer && (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor={Direction.left}
        >

          <List
            sx={{

              zIndex: 2,
            }}
          >
            {" "}
            {token && role == "customer" && (
              <ListItemButton
                component={Link}
                to="shooping-cart"
                onClick={() => setOpenDrawer(false)}
                sx={{
                  [Direction.marginRight]: "50px",
                }}
              >
                <IconButton>
                  <ShoppingCartIcon
                    sx={{
                      fontSize: "2rem",
                      color: "white",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  />
                  <CartNumber>
                    {localStorage.getItem("countOfCartItem") != "0" && localStorage.getItem("countOfCartItem")}
                  </CartNumber>
                </IconButton>{" "}
              </ListItemButton>
            )}
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
                data-aos={`fade-${Direction.right}`}
                data-aos-easing="linear"
                data-aos-duration={idx * 180}
                data-aos-delay={idx * 350}
                key={idx}
                component={Link}
                onClick={() => handleClick(el, idx, array)}
              >
                <ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={el.label} />
                </ListItemIcon>
              </ListItemButton>
            ))}
            <DrawerCloseIcon onClick={() => setOpenDrawer(false)}>
              <CloseIcon />
            </DrawerCloseIcon>
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

import React, { useRef, useState, useEffect } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Tab,
  MenuItem,
  Menu,
  useMediaQuery,
  Container,
  ListItemIcon,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import { TabContext } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DrawerComponent from "@components/header/Drawer";
import ModalSignup from "@components/modal";
import SlideSearch from "@components/slide";
import Mode from "@components/mode";
import Search from "@components/search";
import LanguageSelection from "@components/languages";
import { AppbarHeader, CartNumber, TabsElementsList } from "@styles/appbar";
import { Colors } from "@styles/theme";
import useHeaderElements from "@hooks/use-header-elements";
import UseDebounce from "@hooks/use-debounce";
import UseToggle from "@hooks/use-toggle";
// import { getTotalQuantities } from "@state/slices/cart";
import { activate } from "@state/slices/active";
// import MyComponent from "../../searchandSelect.jsx";
import styles from "@components/header/style.module.css";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState(null);
  const firstRef = useRef();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { pumpCartQuantity, cgBgcolor, sizeFavorite } = styles;
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const { allElements, allTabsElements, authElements } = useHeaderElements();
  const [anchorElSign, setAnchorElSign] = useState(null);
  const openSign = Boolean(anchorElSign);
  const handleClickSign = (event) => {
    setAnchorElSign(event.currentTarget);
  };
  const handleCloseSign = () => {
    setAnchorElSign(null);
  };
  const [open_modal, toggle] = UseToggle();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
    setSearchParams({ queryformMahmoud: searchValue });
    console.log(searchParams);
  };
  const dispatch = useDispatch();
  const { activeLink } = useSelector((state) => state.active);
  const { token, role } = useSelector((state) => state.auth);
  // const qunatityNumbers = useSelector(getTotalQuantities);
  const { countOfCartItems } = useSelector((state) => state.cart);
  const handleClickAuth = (authel, index) => {
    handleCloseSign();
    index === 1 && (token ? authel.click?.() : toggle());
  };
  const setSearchFn = () => setShowSearch(false);
  const closeModal = () => toggle(false);
  const [isAnimate, setIsAnimate] = UseDebounce(500);

  const quantityStyle = `${isAnimate ? pumpCartQuantity : ""}`;
  const heartStyle = `${isAnimate ? cgBgcolor : ""}`;

  console.log(location.pathname.split("/"));
  const locationPath = location.pathname.split("/")[1];
  console.log("locationPath");
  console.log(locationPath);
  useEffect(() => { }, [countOfCartItems]);
  return (
    <div style={{ opacity: role === "reviewer" ? 0 : 1 }}>
      <AppBar position="fixed" ref={firstRef}>
        <Toolbar>
          {isMatch ? (
            <>
              {role === "customer" && (
                <>
                  <IconButton component={Link} to="shooping-cart">
                    <ShoppingCartIcon
                      sx={{
                        fontSize: "2rem",
                        color: "white",
                        "&:hover": {
                          color: "blue",
                        },
                      }}
                    />
                    <CartNumber className={quantityStyle}>
                      {countOfCartItems}
                    </CartNumber>
                  </IconButton>

                  <IconButton component={Link} to="favorite">
                    <FavoriteIcon
                      className={`${heartStyle}`}
                      sx={{
                        fontSize: "2rem !important",
                        color: locationPath === "favorite" ? "red" : "white",
                        "&:hover": {
                          color: "red !important",
                        },
                      }}


                    />
                  </IconButton>

                </>
              )}



              <AppbarHeader
                className="logo"
                transition={{ delay: 0.7, duration: 1.6 }}
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                variant="h5"
                sx={{
                  fontSize: {
                    xs: "1.5em",
                    sm: "1.75em",
                    md: "2em",
                  },
                  fontStyle: "normal",
                  whiteSpace: "nowrap",
                }}
              >
                {t("website-title")}
              </AppbarHeader>
              <LanguageSelection />
              <Mode />
              <DrawerComponent drawerElements={allElements} />
            </>
          ) : (
            <>
              <motion.div
                className="logo"
                transition={{ delay: 0.7, duration: 1.6 }}
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
              >
                <AppbarHeader sx={{
                  fontStyle: "normal"
                }}>{t("website-title")}</AppbarHeader>
              </motion.div>
              {role === "customer" && (
                <>
                  <IconButton component={Link} to="shooping-cart">
                    <ShoppingCartIcon
                      sx={{
                        fontSize: "2rem",
                        color: "white",
                        "&:hover": {
                          color: "blue",
                        },
                      }}
                    />
                    <CartNumber className={quantityStyle}>
                      {countOfCartItems}
                    </CartNumber>
                  </IconButton>

                  <IconButton component={Link} to="favorite">
                    <FavoriteIcon
                      className={`${heartStyle}`}
                      sx={{
                        fontSize: "2rem !important",
                        color: locationPath === "favorite" ? "red" : "white",
                        "&:hover": {
                          color: "red !important",
                        },
                      }}
                    />
                  </IconButton>
                </>
              )}
              {/* <div>{process.env.REACT_APP_API_URL}</div> */}
              <TabContext value={value}>
                <TabsElementsList
                  textColor="inherit"
                  indicatorColor="secondary"
                // onChange={handleChange}
                >
                  {allTabsElements.map((el, idx) => (
                    <Tab
                      key={el.to}
                      component={Link}
                      // onClick={() => dispatch(activate(el.to))}
                      {...el}
                      sx={{
                        fontSize: { md: "12px", lg: "16px" },
                        display: "inline",
                        textAlign: "center",
                        color: locationPath === el.to ? "bold" : "normal",
                        borderBottom:
                          locationPath === el.to ? "2px solid white" : "none",
                        lineHeight: "32px",
                      }}
                    />
                  ))}
                </TabsElementsList>
              </TabContext>
              {/* <MyComponent onChange={handleSearchChange} /> */}
              <Search headerColor="white" />
              <LanguageSelection />
              <Mode />
              <IconButton
                variant="h6"
                component="button"
                onClick={handleClickSign}
              >
                <AccountCircleIcon
                  sx={{ color: Colors.white }}
                  fontSize="medium"
                />
                <ArrowDropDownIcon
                  fontSize="small"
                  sx={{ color: Colors.white }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorElSign}
                open={openSign}
                onClose={handleCloseSign}
              >
                {authElements.map((authel, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    {...authel}
                    onClick={() => {
                      handleClickAuth(authel, index);
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <span>{authel.label}</span>
                      {authel.label === t('logout') ? <LogoutIcon /> : authel.label === t('login') ? <LoginIcon /> : null}
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="md">
        <SlideSearch show={showSearch} dir={"down"} close={setSearchFn} />
      </Container>
      <ModalSignup open_modal={open_modal} close={closeModal} />
      <div id="firstSection"></div>
    </div>
  );
}

export default Header;

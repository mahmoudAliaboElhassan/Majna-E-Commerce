import React, { useRef, useState } from "react";

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
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import { TabContext } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import DrawerComponent from "@components/header/Drawer";
import ModalSignup from "@components/Modal";
import SlideSearch from "@components/Slide";
import { AppbarHeader, CartNumber, TabsElementsList } from "@styles/appbar";
import useHeaderElements from "@hooks/use-header-elements";
import UseDirection from "@hooks/use-direction";
import UseLanguages from "@hooks/use-languages";
import { Colors } from "@styles/theme";
import LanguageSelection from "@components/languages";
import Mode from "@components/mode";
import Search from "@components/search";
import { getTotalQuantities } from "@state/slices/cart";
import { activate } from "@state/slices/active";
// import MyComponent from "../../searchandSelect.jsx";

function Header() {
  const { Languages } = UseLanguages();
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState(null);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.slice(1) || "");
  const handleActiveTab = (to) => setActiveTab(to);
  const firstRef = useRef();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const { allElements, allTabsElements, authElements } = useHeaderElements();
  const { Direction } = UseDirection();
  const [showSearchRe, setShowSearcRe] = useState(false);
  const [anchorElSign, setAnchorElSign] = useState(null);
  const openSign = Boolean(anchorElSign);
  const handleClickSign = (event) => {
    setAnchorElSign(event.currentTarget);
  };
  const handleCloseSign = () => {
    setAnchorElSign(null);
  };
  const [open_modal, setOpenModal] = React.useState(false);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
    setSearchParams({ queryformMahmoud: searchValue });
    console.log(searchParams);
  };
const dispatch=useDispatch()
  const {activeLink}=useSelector((state)=>state.active)

  const { token, role } = useSelector((state) => state.auth);
  const qunatityNumbers = useSelector(getTotalQuantities);

  const handleClickAuth = (authel, index) => {
    handleCloseSign();
    index === 1 && (token ? authel.click?.() : setOpenModal(!open_modal));
  };
  const setSearchFn = () => setShowSearch(false);
  const closeModal = () => setOpenModal(false);

  return (
    <div style={{ opacity: role === "reviewer" ? 0 : 1 }}>
      <AppBar position="fixed" ref={firstRef}>
        <Toolbar>
          {isMatch ? (
            <>
              <IconButton>
                <ShoppingCartIcon sx={{ fontSize: "2rem", color: "white" }} />
                <CartNumber>{qunatityNumbers}</CartNumber>
              </IconButton>
              <AppbarHeader
                className="logo"
                transition={{ delay: 0.7, duration: 1.6 }}
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                variant="h5"
                sx={{ fontSize: "2em" }}
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
                <AppbarHeader sx={{ fontSize: { md: "1.5em", lg: "2em" } }}>
                  {t("website-title")}
                </AppbarHeader>
              </motion.div>
              <IconButton>
                <ShoppingCartIcon sx={{ fontSize: "2rem", color: "white" }} />
                <CartNumber>{qunatityNumbers}</CartNumber>
              </IconButton>
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
                      onClick={() => dispatch(activate(el.to))}
                      {...el}
                      sx={{
                        fontSize: { md: "12px", lg: "16px" },
                        display: "inline",
                        textAlign: "center",
                        color: activeLink === el.to ? "bold" : "normal",
                        borderBottom:
                          activeLink === el.to ? "2px solid white" : "none",
                      }}
                    />
                  ))}
                </TabsElementsList>
              </TabContext>
              {/* <MyComponent onChange={handleSearchChange} /> */}
              <Search onChange={handleSearchChange} />
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
                    {authel.label}
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

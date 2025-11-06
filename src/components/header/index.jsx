import React, { useRef, useState, useEffect } from "react"

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
} from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SearchIcon from "@mui/icons-material/Search"
import { useTheme } from "@emotion/react"
import { motion, transform } from "framer-motion"
import { TabContext } from "@mui/lab"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import DrawerComponent from "@components/header/Drawer"
import ModalSignup from "@components/modal"
import SlideSearch from "@components/slide"
import Mode from "@components/mode"
import Search from "@components/search"
import LanguageSelection from "@components/languages"
import { AppbarHeader, CartNumber, TabsElementsList } from "@styles/appbar"
import { Colors } from "@styles/theme"
import useHeaderElements from "@hooks/use-header-elements"
import UseDebounce from "@hooks/use-debounce"
import UseToggle from "@hooks/use-toggle"
import UseDirection from "@hooks/use-direction"
import styles from "@components/header/style.module.css"
import { authIconButtonStyle, iconColor } from "../../styles/appbar"

function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [value, setValue] = useState(null)
  const firstRef = useRef()
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { pumpCartQuantity, cgBgcolor, sizeFavorite } = styles
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"))
  const { t } = useTranslation()
  const { allElements, allTabsElements, authElements } = useHeaderElements()
  const [anchorElSign, setAnchorElSign] = useState(null)
  const openSign = Boolean(anchorElSign)
  const handleClickSign = (event) => {
    setAnchorElSign(event.currentTarget)
  }
  const handleCloseSign = () => {
    setAnchorElSign(null)
  }
  const { Direction } = UseDirection()

  const [open_modal, toggle] = UseToggle()

  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
    console.log(searchValue)
    setSearchParams({ queryformMahmoud: searchValue })
    console.log(searchParams)
  }
  const dispatch = useDispatch()
  const { activeLink } = useSelector((state) => state.active)
  const { token, role } = useSelector((state) => state.auth)
  // const qunatityNumbers = useSelector(getTotalQuantities);
  const { countOfCartItems } = useSelector((state) => state.cart)
  const handleClickAuth = (authel, index) => {
    handleCloseSign()
    index === 1 && (token ? authel.click?.() : toggle())
  }
  const setSearchFn = () => setShowSearch(false)
  const closeModal = () => toggle(false)
  const [isAnimate, setIsAnimate] = UseDebounce(500)

  const quantityStyle = `${isAnimate ? pumpCartQuantity : ""}`
  const heartStyle = `${isAnimate ? cgBgcolor : ""}`

  console.log(location.pathname.split("/"))
  const locationPath = `/${location.pathname.split("/")[1]}`
  console.log("locationPath")
  console.log(locationPath)
  console.log(location.pathname)
  useEffect(() => {}, [countOfCartItems])
  console.log(
    "type of local storage",
    typeof localStorage.getItem("countOfCartItem")
  )
  const { mymode } = useSelector((state) => state.mode)

  const getAuthMenuIcon = (label) => {
    if (label === t("logout")) {
      return <LoginIcon className="auth-icon" sx={menuIconStyle} />
    } else if (label === t("login")) {
      return <LogoutIcon className="auth-icon" sx={menuIconStyle} />
    }
    return null
  }
  const menuIconStyle = {
    fontSize: "20px",
    color: mymode === "dark" ? "#cbd5e1" : "#64748b",
    transition: "all 0.2s ease",
    transform: `rotate(${Direction.direction == "ltr" ? "180deg" : "0"})`,
  }
  const authMenuStyle = {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      marginTop: "8px",
      minWidth: "220px",
      background: mymode === "dark" ? "#1e293b" : "#ffffff",
      border: `1px solid ${
        mymode === "dark"
          ? "rgba(251, 191, 36, 0.2)"
          : "rgba(245, 158, 11, 0.2)"
      }`,
      boxShadow:
        mymode === "dark"
          ? "0 8px 24px rgba(251, 191, 36, 0.15)"
          : "0 8px 24px rgba(245, 158, 11, 0.15)",
    },
  }

  const authMenuItemStyle = {
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: 500,
    color: mymode === "dark" ? "#f1f5f9" : "#0f172a",
    transition: "all 0.2s ease",
    borderRadius: "6px",
    margin: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    "&:hover": {
      background:
        mymode === "dark"
          ? "rgba(251, 191, 36, 0.15)"
          : "rgba(245, 158, 11, 0.1)",
      transform: "translateX(4px)",
      "& .auth-icon": {
        transform: "scale(1.1)",
        color: iconColor,
      },
    },
  }

  const logoutMenuItemStyle = {
    ...authMenuItemStyle,
    "&:hover": {
      background:
        mymode === "dark"
          ? "rgba(239, 68, 68, 0.15)"
          : "rgba(220, 38, 38, 0.1)",
      transform: "translateX(4px)",
      color: mymode === "dark" ? "#fca5a5" : "#dc2626",
      "& .auth-icon": {
        transform: "scale(1.1)",
        color: mymode === "dark" ? "#ef4444" : "#dc2626",
      },
    },
  }

  return (
    <div style={{ opacity: role === "reviewer" ? 0 : 1 }}>
      <AppBar position="fixed" ref={firstRef}>
        <Toolbar>
          {isMatch ? (
            <>
              {token && role === "Customer" && (
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
                    />{" "}
                    {localStorage.getItem("countOfCartItem") !== "0" && (
                      <CartNumber className={quantityStyle}>
                        {localStorage.getItem("countOfCartItem")}
                      </CartNumber>
                    )}
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
              <Link
                to="/"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
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
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {t("website-title")}
                </AppbarHeader>
              </Link>
              <LanguageSelection />
              <Mode />
              <DrawerComponent drawerElements={allElements} />
            </>
          ) : (
            <>
              <Link to="/">
                {/* <IconButton component={Link} to="/"> */}
                <AppbarHeader
                  transition={{ delay: 0.7, duration: 1.6 }}
                  initial={{ y: "-100vh" }}
                  animate={{ y: 0 }}
                  className="logo"
                  to="/"
                  sx={{
                    fontStyle: "normal",
                    cursor: "pointer",
                  }}
                >
                  {t("website-title")}
                </AppbarHeader>
                {/* </IconButton> */}
              </Link>
              {token && role === "Customer" && (
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
                    {localStorage.getItem("countOfCartItem") !== "0" && (
                      <CartNumber className={quantityStyle}>
                        {localStorage.getItem("countOfCartItem")}
                      </CartNumber>
                    )}
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

              <TabContext value={value}>
                <TabsElementsList
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  {allTabsElements.map((el, idx) => (
                    <Tab
                      key={el.to}
                      component={Link}
                      to={el.to}
                      {...el}
                      sx={{
                        fontSize: { md: "12px", lg: "16px" },
                        display: "inline",
                        textAlign: "center",
                        color: "white",
                        fontWeight: locationPath === el.to ? "bold" : "normal", // Set font weight to bold when active
                        borderBottom:
                          locationPath === el.to ? "2px solid white" : "none", // Set border bottom when active
                        lineHeight: "32px",
                        "&:hover": {
                          color: "white",
                          borderBottom: "2px solid white",
                        },
                      }}
                    />
                  ))}
                </TabsElementsList>
              </TabContext>

              {/* <MyComponent onChange={handleSearchChange} /> */}
              <Search headerColor={true} />
              <LanguageSelection />
              <Mode />
              <IconButton
                variant="h6"
                component="button"
                onClick={handleClickSign}
                sx={authIconButtonStyle}
              >
                <AccountCircleIcon
                  sx={{ color: iconColor, fontSize: "24px" }}
                />
                <ArrowDropDownIcon
                  fontSize="small"
                  sx={{
                    color: iconColor,
                    transition: "transform 0.3s ease",
                    transform: openSign ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorElSign}
                open={openSign}
                onClose={handleCloseSign}
                sx={authMenuStyle}
                transformOrigin={{
                  vertical: "top",
                  horizontal: Direction.direction === "rtl" ? "right" : "left",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: Direction.direction === "rtl" ? "right" : "left",
                }}
              >
                {authElements.map((authel, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    {...authel}
                    onClick={() => {
                      handleClickAuth(authel, index)
                    }}
                    sx={
                      authel.label === t("logout")
                        ? logoutMenuItemStyle
                        : authMenuItemStyle
                    }
                  >
                    <span style={{ fontWeight: 500 }}>{authel.label}</span>
                    {getAuthMenuIcon(authel.label)}
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
    </div>
  )
}

export default Header

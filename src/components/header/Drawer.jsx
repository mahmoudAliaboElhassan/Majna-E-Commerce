import React, { useCallback, useEffect, useState } from "react"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MenuIcon from "@mui/icons-material/Menu"
import {
  List,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import SlideSearch from "@components/slide"
import ModalSignup from "@components/modal"
import { Colors } from "@styles/theme"
import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import UseToggle from "@hooks/use-toggle"
import { activate } from "@state/slices/active"
import { CartNumber, DrawerCloseIcon } from "@styles/appbar"

function DrawerComponent({ drawerElements }) {
  const [active, setActive] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [open_modal, toggle] = UseToggle(false)
  const { t } = useTranslation()
  const { Direction } = UseDirection()
  const { themeMode } = UseThemMode()
  const { token, role } = useSelector((state) => state.auth)
  const { countOfCartItems } = useSelector((state) => state.cart)

  const closeModal = useCallback(() => toggle(false), [])
  const closeSearch = useCallback(() => setShowSearch(false), [])
  const dispatch = useDispatch()

  const handleClick = (element, index, array) => {
    dispatch(activate(element.to))
    setOpenDrawer(false)

    if (index === array.length - 1) {
      if (token) {
        element.click?.()
      } else {
        toggle()
      }
    }
  }
  const { mymode } = useSelector((state) => state.mode)
  const handleSearchButton = () => {
    setShowSearch(true)
    setOpenDrawer(false)
  }

  const DrawerTheme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 280,
            background:
              themeMode === "dark"
                ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
            borderTopRightRadius: Direction.direction === "rtl" ? 0 : "24px",
            borderBottomRightRadius: Direction.direction === "rtl" ? 0 : "24px",
            borderTopLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
            borderBottomLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.15)"
                : "rgba(245, 158, 11, 0.15)"
            }`,
            boxShadow:
              themeMode === "dark"
                ? "0 8px 32px rgba(251, 191, 36, 0.2)"
                : "0 8px 32px rgba(245, 158, 11, 0.15)",
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: "6px 12px",
            borderRadius: "10px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: "12px 16px",

            "&:hover": {
              background:
                themeMode === "dark"
                  ? "rgba(251, 191, 36, 0.1)"
                  : "rgba(245, 158, 11, 0.08)",
              transform: "translateX(4px)",
              boxShadow:
                themeMode === "dark"
                  ? "0 2px 8px rgba(251, 191, 36, 0.15)"
                  : "0 2px 8px rgba(245, 158, 11, 0.12)",
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={DrawerTheme}>
      <AnimatePresence initial={false}>
        {!openDrawer && (
          <IconButton
            sx={{
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(90deg)",
              },
            }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon
              style={{ color: mymode == "light" ? "white" : "#fbbf24" }}
            />
          </IconButton>
        )}

        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor={Direction.left}
        >
          <List
            sx={{
              paddingTop: "24px",
              paddingBottom: "80px",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Shopping Cart Button */}
            {token && role === "customer" && (
              <ListItemButton
                component={Link}
                to="shooping-cart"
                onClick={() => setOpenDrawer(false)}
                sx={{
                  marginBottom: "16px",
                  background:
                    themeMode === "dark"
                      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)",
                  border: `1px solid ${
                    themeMode === "dark"
                      ? "rgba(251, 191, 36, 0.2)"
                      : "rgba(245, 158, 11, 0.2)"
                  }`,
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <Box sx={{ position: "relative" }}>
                    <ShoppingCartIcon
                      sx={{
                        fontSize: "26px",
                        color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
                      }}
                    />
                    {localStorage.getItem("countOfCartItem") !== "0" && (
                      <CartNumber>
                        {localStorage.getItem("countOfCartItem")}
                      </CartNumber>
                    )}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={t("cart")}
                  sx={{
                    color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            )}

            {/* Search Button */}
            <ListItemButton
              onClick={handleSearchButton}
              sx={{
                marginBottom: "8px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <SearchIcon
                  sx={{
                    color: themeMode === "dark" ? "#cbd5e1" : "#475569",
                    fontSize: "24px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={t("search")}
                sx={{
                  color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>

            <Divider
              sx={{
                margin: "16px 12px",
                borderColor:
                  themeMode === "dark"
                    ? "rgba(251, 191, 36, 0.15)"
                    : "rgba(245, 158, 11, 0.15)",
              }}
            />

            {/* Navigation Items */}
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
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {el.icon && (
                    <Box
                      sx={{
                        color: themeMode === "dark" ? "#cbd5e1" : "#475569",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {el.icon}
                    </Box>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={el.label}
                  sx={{
                    color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
                    fontWeight: 500,
                    "& .MuiTypography-root": {
                      fontSize: "15px",
                    },
                  }}
                />
              </ListItemButton>
            ))}

            {/* Close Button */}
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
  )
}

export default DrawerComponent

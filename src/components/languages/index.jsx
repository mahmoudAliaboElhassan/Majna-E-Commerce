import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import i18next from "i18next"
import { IconButton, Divider, MenuItem, Menu } from "@mui/material"
import LanguageIcon from "@mui/icons-material/Language"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useSelector } from "react-redux"

import UseLanguages from "@hooks/use-languages"
import UseDirection from "@hooks/use-direction"
import UseThemMode from "@hooks/use-theme"
import { authIconButtonStyle, iconColor } from "../../styles/appbar"

function LanguageSelection() {
  const { Languages } = UseLanguages()
  const { Direction } = UseDirection()
  const { themeMode } = UseThemMode()
  const { mymode } = useSelector((state) => state.mode)

  const currLanguageCode = Cookies.get("i18next") || "en"
  const currentLanguage = Languages.find((l) => l.code === currLanguageCode)

  useEffect(() => {
    document.documentElement.dir = currentLanguage.dir || "ltr"
  }, [currentLanguage])

  const [clickedElement, setClickedElement] = useState(null)
  const open = Boolean(clickedElement)

  const handleClose = () => {
    setClickedElement(null)
  }

  const changeLang = (code) => {
    i18next.changeLanguage(code)
    setClickedElement(null)
  }

  const handleClick = (e) => {
    setClickedElement(e.currentTarget)
  }

  const { ref, inView } = useInView({ triggerOnce: false })

  const menuStyle = {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      marginTop: "8px",
      minWidth: "200px",
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

  const menuItemStyle = (isActive) => ({
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: isActive ? 600 : 500,
    color: mymode === "dark" ? "#f1f5f9" : "#0f172a",
    background: isActive
      ? mymode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.1)"
      : "transparent",
    transition: "all 0.2s ease",
    borderRadius: "6px",
    margin: "4px 8px",
    "&:hover": {
      background:
        mymode === "dark"
          ? "rgba(251, 191, 36, 0.2)"
          : "rgba(245, 158, 11, 0.15)",
      transform: "translateX(4px)",
    },
    "&.Mui-disabled": {
      color: mymode === "dark" ? "#fbbf24" : "#f59e0b",
      opacity: 1,
      background:
        mymode === "dark"
          ? "rgba(251, 191, 36, 0.15)"
          : "rgba(245, 158, 11, 0.1)",
    },
  })

  const dividerStyle = {
    margin: "4px 16px",
    borderColor:
      mymode === "dark" ? "rgba(251, 191, 36, 0.1)" : "rgba(245, 158, 11, 0.1)",
  }

  const flagStyle = {
    marginRight: Direction.direction === "rtl" ? "0" : "12px",
    marginLeft: Direction.direction === "rtl" ? "12px" : "0",
    fontSize: "20px",
    filter: mymode === "dark" ? "brightness(1.1)" : "brightness(1)",
  }

  return (
    <>
      <IconButton onClick={handleClick} sx={authIconButtonStyle}>
        <LanguageIcon sx={{ color: iconColor, fontSize: "22px" }} />
        <ArrowDropDownIcon
          fontSize="small"
          sx={{
            color: iconColor,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </IconButton>

      <Menu
        open={open}
        anchorEl={clickedElement}
        onClose={handleClose}
        sx={menuStyle}
        transformOrigin={{
          vertical: "top",
          horizontal: Direction.direction === "rtl" ? "right" : "left",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: Direction.direction === "rtl" ? "right" : "left",
        }}
      >
        {Languages.map(({ country_code, code, name }, index) => (
          <div key={country_code}>
            <MenuItem
              onClick={() => changeLang(code)}
              disabled={currLanguageCode === code}
              sx={menuItemStyle(currLanguageCode === code)}
            >
              <i className={`flag flag-${country_code}`} style={flagStyle} />
              {name}
            </MenuItem>
            {index < Languages.length - 1 && <Divider sx={dividerStyle} />}
          </div>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSelection

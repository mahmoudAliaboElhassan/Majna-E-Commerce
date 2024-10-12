import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import i18next from "i18next";
import { IconButton, Divider, MenuItem, Menu } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import UseLanguages from "@hooks/use-languages";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";
import { MenuItemElement } from "@styles/langs";
import UseThemMode from "@hooks/use-theme";

function LanguageSelection() {
  const { Languages } = UseLanguages();
  const { Direction } = UseDirection();
  const currLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = Languages.find((l) => l.code === currLanguageCode);
  useEffect(() => {
    document.documentElement.dir = currentLanguage.dir || "ltr";
  });
  const [clickedElement, setClickedElement] = useState(null);
  const open = Boolean(clickedElement);
  const [openMenu, setOpenMenu] = useState(false);
  const handleClose = (e, val) => {
    setClickedElement(null);
    setOpenMenu(false);
  };
  const changeLang = (code) => {
    i18next.changeLanguage(code);
    setClickedElement(null);
  };
  const handleClick = (e, val) => {
    setClickedElement(e.currentTarget);
    setOpenMenu(!openMenu);
  };
  const { themeMode } = UseThemMode();
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <>
      <IconButton onClick={handleClick}>
        <LanguageIcon style={{ color: Colors.white }} />
        <ArrowDropDownIcon fontSize="small" sx={{ color: Colors.white }} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={clickedElement}
        onClose={handleClose}
        style={{ borderRadius: "10px" }}
      >
        {Languages.map(({ country_code, code, name }) => (
          <div key={country_code}>
            <MenuItemElement
              onClick={() => changeLang(code)}
              disabled={currLanguageCode === code}
            >
              <i
                className={`flag flag-${country_code} larger-icon mx-1`}
              ></i>{" "}
              {name}
            </MenuItemElement>
            <Divider />
          </div>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSelection;

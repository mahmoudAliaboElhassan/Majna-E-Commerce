import React from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./introductory.css";
import Image from "../../image";
import UseThemMode from "@hooks/use-theme";
import UseMediaQueryHook from "@hooks/use-media-query";

function Introductory() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
const {isMatch}=UseMediaQueryHook()
  return (
    <div className={`hero ${themeMode}`} style={{textAlign:isMatch?"center":"inherit"}}>
      <Container data-aos="fade-up">
        <div className="hero-left">
          <h2>{t("NEW arrivals Only")}</h2>
          <div className="hero-hand-icon" style={{justifyContent:isMatch?"center":"start"}}>
            <p>{t("new")}</p>
            <img src={Image[10]} alt="New Collection Icon" />
          </div>
          <p>{t("Collections")}</p>
          <p>{t("for everyone")}</p>
          <div className="hero-latest-btn">
            <div>{t("Latest Collection")}</div>
            {theme.direction === "rtl" ? (
              <ArrowBackIosNewIcon />
            ) : (
              <ArrowForwardIosIcon />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Introductory;

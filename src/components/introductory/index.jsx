import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./introductory.css";
import Image from "../../image";
import UseThemMode from "@hooks/use-theme";
import UseMediaQueryHook from "@hooks/use-media-query";
import { IntroudctoryButton } from "@styles/introductory";

 

function Introductory() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { isMatch } = UseMediaQueryHook();
  useEffect(() => {}, [theme.direction]);

  return (
    <div
      className={`hero ${themeMode}`}
      style={{ textAlign: isMatch ? "center" : "inherit" }}
    >
      <Container data-aos="fade-up">
        <div className="hero-left">
          <h2>{t("NEW arrivals Only")}</h2>
          <div
            className="hero-hand-icon"
            style={{ justifyContent: isMatch ? "center" : "start" }}
          >
            <p>{t("new")}</p>
            <img src={Image[10]} alt="New Collection Icon" />
          </div>
          <p>{t("Collections")}</p>
          <p>{t("for everyone")}</p>
          <IntroudctoryButton
            style={{ transition: "0.5s" }}
          >
            <div>{t("Latest Collection")}</div>
            {theme.direction === "rtl" ? (
              <ArrowBackIosNewIcon
                className="icon"
                style={{ transition: "0.5s" }}
              />
            ) : (
              <ArrowForwardIosIcon
                className="icon"
                style={{ transition: "0.5s" }}
              />
            )}
          </IntroudctoryButton>
        </div>
      </Container>
    </div>
  );
}

export default Introductory;

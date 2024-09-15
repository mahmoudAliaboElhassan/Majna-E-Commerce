import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import { Container } from "@mui/material";

import DataListing from "@components/dataListing";
import { AppbarHeader } from "@styles/appbar";
import UseMediaQueryHook from "@hooks/use-media-query";
import UseFAQ from "@hooks/use-faq";
import Team from "@components/team";
import Footer from "@components/footer";

function About() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(process.env.REACT_APP_API_URL);
  const { t } = useTranslation();
  const { FAQ } = UseFAQ()
  return (
    <>
      <Container>
        <AppbarHeader data-aos="fade-up">{t("important-questions")}</AppbarHeader>
        <Typography variant="h5" style={{ textAlign: "center", opacity: "0.8" }}>{t('questions-info')}
        </Typography>
      </Container>
      <DataListing data={FAQ} />
      <Team />
      <Footer />
    </>
  );
}

export default About;

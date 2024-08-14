import React from "react";

import { useTranslation } from "react-i18next";
import { Container, Grid, makeStyles } from "@material-ui/core";

import { AppbarHeader } from "@styles/appbar";
import SocialMedia from "@components/contactInfo/socialMedia";
import ContactForm from "@components/contactInfo/contactForm";
import Footer from "@components/footer";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
  },
}));

function Contacts() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <AppbarHeader data-aos="fade-up">{t("contact-us")}</AppbarHeader>
      <Container className={classes.formWrapper}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <SocialMedia />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Contacts;

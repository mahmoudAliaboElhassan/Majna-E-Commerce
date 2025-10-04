import React from "react"
import { useTranslation } from "react-i18next"
import { Container, Grid, Box } from "@mui/material"

import { AppbarHeader } from "@styles/appbar"
import SocialMedia from "@components/contactInfo/socialMedia"
import ContactForm from "@components/contactInfo/contactForm"
import Footer from "@components/footer"
import UseThemeMode from "@hooks/use-theme"

function Contacts() {
  const { t } = useTranslation()
  const { themeMode } = UseThemeMode()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <AppbarHeader
        data-aos="fade-up"
        sx={{
          paddingTop: "40px",
          marginBottom: "48px",
        }}
      >
        {t("contact-us")}
      </AppbarHeader>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <SocialMedia />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  )
}

export default Contacts

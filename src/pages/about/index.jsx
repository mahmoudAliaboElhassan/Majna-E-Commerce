import React from "react"
import { useTranslation } from "react-i18next"
import { Typography, Container, Box } from "@mui/material"

import DataListing from "@components/dataListing"
import { AppbarHeader } from "@styles/appbar"
import UseFAQ from "@hooks/use-faq"
import Team from "@components/team"
import Footer from "@components/footer"
import UseThemeMode from "@hooks/use-theme"

function About() {
  const { t } = useTranslation()
  const { FAQ } = UseFAQ()
  const { themeMode } = UseThemeMode()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            paddingTop: "40px",
            paddingBottom: "20px",
          }}
        >
          <AppbarHeader data-aos="fade-up">
            {t("important-questions")}
          </AppbarHeader>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              opacity: 0.8,
              color: themeMode === "dark" ? "#cbd5e1" : "#475569",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 400,
              marginTop: "16px",
              marginBottom: "40px",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            {t("questions-info")}
          </Typography>
        </Box>
      </Container>

      <DataListing data={FAQ} />
      <Team />
      <Footer />
    </Box>
  )
}

export default About

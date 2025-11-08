import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
// i imported them as error page does not come from RootLayout

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { Link, useRouteError } from "react-router-dom"

import errorImage from "@assets/error2.svg"
import { ErrorContainer } from "@styles/error"

const ErrorPage = () => {
  const { t } = useTranslation()
  const error = useRouteError()

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <>
      <ErrorContainer>
        <Typography variant="h2" sx={{ my: 2 }} data-aos="fade-down">
          {t("ops")}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mb: 1, textAlign: "center" }}
          data-aos="fade-up"
        >
          {t("error_message")}{" "}
        </Typography>
        <p data-aos="zoom-in">
          <i style={{ textAlign: "center", marginBottom: "-40px" }}>
            {error.statusText || error.message}
          </i>
        </p>
        <img
          src={errorImage}
          alt="Confused Woman"
          className="mb-4 img-fluid"
          style={{ width: "60%" }}
          loading="lazy"
          data-aos="zoom-in"
        />{" "}
        <Button component={Link} to="/" variant="outlined">
          {t("go-back")}
        </Button>
      </ErrorContainer>
    </>
  )
}

export default ErrorPage

// when i make inital value for state to localstorage
// and when remove localStorage i should remove the value of state itself
// at the same time as it still keep the value of local storage before deleting
// so i have two options either setState(null )
// or render the page to take the value of local storage after deleting it that is null

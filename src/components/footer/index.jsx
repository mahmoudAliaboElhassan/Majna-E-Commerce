import React, { useState, useCallback } from "react"

import { Container, Grid, Card } from "@mui/material"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import UseHeaderElements from "@hooks/use-header-elements"
import UseToggle from "@hooks/use-toggle"
import { AppbarHeader } from "@styles/appbar"
import { CardFooter, StyledLinkItem } from "@styles/footer"
import ModalSignup from "@components/modal"
import withGuard from "@utils/withGuard"

function Footer() {
  const [open_modal, toggle] = UseToggle(false)
  const { t } = useTranslation()
  const date = new Date()
  const year = date.getFullYear()
  const { allElements } = UseHeaderElements()
  const { token } = useSelector((state) => state.auth)
  const closeModal = useCallback(() => toggle(false), [])
  const location = useLocation()
  const locationPath = `/${location.pathname.split("/")[1]}`

  const { mymode } = useSelector((state) => state.mode)

  const handleShow = (element, index, array) => {
    if (index === array.length - 1) {
      if (token) {
        element?.click()
      } else {
        toggle()
      }
    }
  }

  return (
    <>
      <CardFooter raised>
        <Container maxWidth="md">
          <Grid container>
            {allElements.map((el, idx, array) => (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <StyledLinkItem
                  {...el}
                  isActive={locationPath === el.to} // Pass isActive prop
                  onClick={() => handleShow(el, idx, array)}
                >
                  {el.label}
                </StyledLinkItem>
              </Grid>
            ))}

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                borderTop: `2px solid ${
                  mymode === "dark" ? "#fbbf24" : "black"
                } `,
                paddingTop: 3,
              }}
            >
              <AppbarHeader
                sx={{
                  position: "relative",
                  zIndex: "9999",
                  color: mymode === "dark" ? "#fbbf24" : "black",
                }}
              >
                {t("made-with")} &copy; {year}
              </AppbarHeader>
            </Grid>
          </Grid>
        </Container>
      </CardFooter>
      <ModalSignup open_modal={open_modal} close={closeModal} />
    </>
  )
}

export default Footer

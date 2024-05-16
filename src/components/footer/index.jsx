import React, { useState, useCallback } from "react";

import { Container, Grid, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import UseHeaderElements from "@hooks/use-header-elements";
import UseToggle from "@hooks/use-toggle";
import { AppbarHeader } from "@styles/appbar";
import { CardFooter, StyledLinkItem } from "@styles/footer";
import ModalSignup from "@components/Modal";

function Footer() {
  const [open_modal, toggle] = UseToggle(false);
  const { t } = useTranslation();
  const date = new Date();
  const year = date.getFullYear();
  const { allElements } = UseHeaderElements();
  const { token } = useSelector((state) => state.auth);
  const closeModal = useCallback(() => toggle(false), []);
  const handleShow = (element, index, array) => {
    index === array.length - 1 && token
      ? element?.click()
      : toggle();
  };

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
                }}
              >
                <StyledLinkItem
                  {...el}
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
              sx={{ borderTop: "2px solid white", paddingTop: 3 }}
            >
              <AppbarHeader sx={{ position: "relative", zIndex: "9999" }}>
                {t("made-with")} &copy; {year}
              </AppbarHeader>
            </Grid>
          </Grid>
        </Container>
      </CardFooter>
      <ModalSignup open_modal={open_modal} close={closeModal} />
    </>
  );
}

export default Footer;

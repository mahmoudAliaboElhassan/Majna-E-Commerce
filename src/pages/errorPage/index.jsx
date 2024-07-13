import React from "react";

import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";

import image from "../../image";
import errorImage from "../../assets/error2.svg";
import { ErrorContainer } from "@styles/error";

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  return (
    <>
      <ErrorContainer>
        <Typography variant="h2" sx={{ my: 2 }}>
          {t("ops")}
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("error_message")}{" "}
        </Typography>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <img
          src={errorImage}
          alt="Confused Woman"
          className="mb-4 img-fluid"
          style={{ width: "60%" }}
          loading="lazy"
        />{" "}
        <Button component={Link} to="/">
          {t("go-back")}
        </Button>
      </ErrorContainer>
      {/* <ImageList>
        {image.map((item) => (
          <ImageListItem key={item}>
            <img
              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={item}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </>
  );
};

export default ErrorPage;

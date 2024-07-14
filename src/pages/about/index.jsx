import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  useMediaQuery,
  CardActionArea,
} from "@mui/material";

import teamImage from "@assets//team/teamImages";
import QuestionsAnswers from "@components/faq";
import UseMediaQueryHook from "@hooks/use-media-query";
import { useTranslation } from "react-i18next";
import { AppbarHeader } from "@styles/appbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function About() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(process.env.REACT_APP_API_URL);
  const { isMatch } = UseMediaQueryHook();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <AppbarHeader>{t("important-questions")}</AppbarHeader>

      <QuestionsAnswers />
      <AppbarHeader>{t("people-developed")}</AppbarHeader>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Card
            component="div"
            data-aos={`fade-${isMatch ? "down" : "right"}`}
            // data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
            sx={{ maxWidth: "100%" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={teamImage[0]}
                alt={"Mahmoud Ali"}
                // sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {t("mahmoud-ali")}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  {t("faculty-mahmoud")}
                </Typography>
                <Typography variant="body1" component="div" color="textPrimary">
                  {t("job-mahmoud")}
                </Typography>
                <LinkedInIcon />
                <GitHubIcon />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            component="div"
            data-aos={`fade-${isMatch ? "up" : "left"}`}
            // data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
            sx={{ maxWidth: "100%" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={teamImage[1]}
                // sx={{ objectFit: "contain" }}
                alt={"Mohammed Abd Elaleem"}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {t("mohammed-abdelaleem")}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  {t("faculty-mohammed")}
                </Typography>
                <Typography variant="body1" component="div" color="textPrimary">
                  {t("job-mohammed")}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <div>الحمد لله تم إسترجاع البيانات</div>
    </Container>
  );
}

export default About;

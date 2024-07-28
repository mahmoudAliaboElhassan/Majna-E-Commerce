import React from "react";

import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Box
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from '@mui/icons-material/Facebook';
import UseMediaQueryHook from "@hooks/use-media-query";
import { useTranslation } from "react-i18next";
import UseThemMode from "@hooks/use-theme";

import teamImage from "@assets/team";
import { AppbarHeader } from "@styles/appbar";

function Team() {
  const { isMatch } = UseMediaQueryHook();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode()
  return (
    <Container maxWidth="md">
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
                <Typography gutterBottom variant="h4" component="div"
                  sx={{
                    fontSize: { xs: "17px", sm: "19px", md: "21px", lg: "27px" },
                    whiteSpace: "nowrap"
                  }}
                >
                  {t("mahmoud-ali")}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom
                  sx={{ fontSize: { xs: "13px", sm: "16px", md: "17px", lg: "23px" } }}
                >
                  {t("faculty-mahmoud")}
                </Typography>
                <Typography variant="body1" component="div" color="textPrimary" sx={{
                  whiteSpace: "nowrap",
                  whiteSpace: "nowrap",
                }}>
                  {t("job-mahmoud")}
                </Typography>

              </CardContent>
            </CardActionArea>
            <CardActions
              style={{
                display: "flex", justifyContent: "center", textAlign: "center"
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  // mr: 1,
                  //  whiteSpace: "nowrap"
                }}
              >
                <a href="https://www.linkedin.com/in/mahmoud-ali-a99713237/" target="_blank" style={{ color: "inherit" }} title={t("linkedin")}>
                  <LinkedInIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    },
                    whiteSpace: "nowrap",

                  }} />
                </a>
              </Box>
              <Box sx={{
                flex: 1,
                // ml: 1
              }}>
                <a href="https://github.com/mahmoudAliaboElhassan" target="_blank" style={{ color: "inherit" }} title={t("github")}>

                  <GitHubIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    },
                    whiteSpace: "nowrap",
                  }} />
                </a>
              </Box>
              <Box sx={{
                flex: 1,
                // ml: 1
              }}>
                <a href="https://www.facebook.com/profile.php?id=100075492203648" target="_blank" style={{ color: "inherit" }} title={t("facebook")}>

                  <FacebookIcon
                    sx={{
                      fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                      },
                      whiteSpace: "nowrap",
                    }} />
                </a>
              </Box>
            </CardActions>
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
                <Typography gutterBottom variant="h4" component="div" sx={{
                  fontSize: { xs: "17px", sm: "19px", md: "21px", lg: "27px" },
                  whiteSpace: "nowrap"
                }}>
                  {t("mohammed-abdelaleem")}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom

                  sx={{ fontSize: { xs: "13px", sm: "16px", md: "17px", lg: "23px" } }}                >
                  {t("faculty-mohammed")}
                </Typography>
                <Typography variant="body1" component="div" color="textPrimary">
                  {t("job-mohammed")}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{
                display: "flex", justifyContent: "center", textAlign: "center"
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  // mr: 1,
                  //  whiteSpace: "nowrap"
                }}
              >
                <a href="https://www.linkedin.com/in/mohamed-abdelaleem-0505431ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" style={{ color: "inherit" }} title={t("linkedin")}>
                  <LinkedInIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    },
                    whiteSpace: "nowrap",

                  }} />
                </a>
              </Box>
              <Box sx={{
                flex: 1,
                // ml: 1
              }}>
                <a href="https://github.com/mohamedAbdelaleem" target="_blank" style={{ color: "inherit" }} title={t("github")}>

                  <GitHubIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    },
                    whiteSpace: "nowrap",
                  }} />
                </a>
              </Box>

            </CardActions>

          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Team;

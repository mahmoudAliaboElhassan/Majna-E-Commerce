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
  Box,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import UseMediaQueryHook from "@hooks/use-media-query";
import UseThemMode from "@hooks/use-theme";
import teamImage from "@assets/team";
import portfolioImage from "@assets/team/profile.png";
import { AppbarHeader } from "@styles/appbar";

function Team() {
  const { isMatch } = UseMediaQueryHook();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();

  // Using useInView to trigger animation when in view
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: false });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: false });

  return (
    <Container maxWidth="md" sx={{ overflow: "hidden" }}>
      <AppbarHeader>{t("people-developed")}</AppbarHeader>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <motion.div
            ref={ref1}
            initial={{ y: isMatch ? -50 : 0, x: isMatch ? 0 : -50, opacity: 0 }}
            animate={
              inView1
                ? { y: isMatch ? 0 : 0, x: isMatch ? 0 : 0, opacity: 1 }
                : {}
            }
            transition={{ duration: isMatch ? 1 : 1.5 }}
          >
            <Card sx={{ maxWidth: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image={teamImage[0]}
                  alt={"Mahmoud Ali"}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      fontSize: {
                        xs: "17px",
                        sm: "19px",
                        md: "21px",
                        lg: "27px",
                      },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("mahmoud-ali")}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "13px",
                        sm: "16px",
                        md: "17px",
                        lg: "23px",
                      },
                    }}
                  >
                    {t("faculty-mahmoud")}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    color="textPrimary"
                    sx={
                      {
                        // whiteSpace: "nowrap",
                      }
                    }
                  >
                    {t("job-mahmoud")}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <a
                    href="https://www.linkedin.com/in/mahmoudfrontenddeveloper/"
                    target="_blank"
                    style={{ color: "inherit" }}
                    title={t("linkedin")}
                  >
                    <LinkedInIcon
                      sx={{
                        fontSize: { xs: "1.5em", sm: "1.75em", md: "2em" },
                      }}
                    />
                  </a>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <a
                    href="https://github.com/mahmoudAliaboElhassan"
                    target="_blank"
                    style={{ color: "inherit" }}
                    title={t("github")}
                  >
                    <GitHubIcon
                      sx={{
                        fontSize: { xs: "1.5em", sm: "1.75em", md: "2em" },
                      }}
                    />
                  </a>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <a
                    href="https://mahmoudaliaboelhassan.github.io/Portfolio-Website/"
                    target="_blank"
                    style={{ color: "inherit" }}
                    title={t("website")}
                  >
                    <PersonIcon
                      sx={{
                        fontSize: { xs: "1.5em", sm: "1.75em", md: "2em" },
                      }}
                    />
                  </a>
                </Box>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            ref={ref2}
            initial={{ y: isMatch ? 50 : 0, x: isMatch ? 0 : 50, opacity: 0 }}
            animate={
              inView2
                ? { y: isMatch ? 0 : 0, x: isMatch ? 0 : 0, opacity: 1 }
                : {}
            }
            transition={{ duration: isMatch ? 2 : 1.5 }}
          >
            <Card sx={{ maxWidth: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image={teamImage[1]}
                  alt={"Mohammed Abd Elaleem"}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      fontSize: {
                        xs: "17px",
                        sm: "19px",
                        md: "21px",
                        lg: "27px",
                      },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("mohammed-abdelaleem")}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "13px",
                        sm: "16px",
                        md: "17px",
                        lg: "23px",
                      },
                    }}
                  >
                    {t("faculty-mohammed")}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    color="textPrimary"
                  >
                    {t("job-mohammed")}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <a
                    href="https://www.linkedin.com/in/mohamed-abdelaleem-0505431ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    style={{ color: "inherit" }}
                    title={t("linkedin")}
                  >
                    <LinkedInIcon
                      sx={{
                        fontSize: { xs: "1.5em", sm: "1.75em", md: "2em" },
                      }}
                    />
                  </a>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <a
                    href="https://github.com/mohamedAbdelaleem"
                    target="_blank"
                    style={{ color: "inherit" }}
                    title={t("github")}
                  >
                    <GitHubIcon
                      sx={{
                        fontSize: { xs: "1.5em", sm: "1.75em", md: "2em" },
                      }}
                    />
                  </a>
                </Box>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Team;

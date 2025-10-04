import React from "react"
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
  IconButton,
} from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PersonIcon from "@mui/icons-material/Person"
import { useTranslation } from "react-i18next"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { styled } from "@mui/material/styles"

import UseMediaQueryHook from "@hooks/use-media-query"
import UseThemMode from "@hooks/use-theme"
import teamImage from "@assets/team"
import { AppbarHeader } from "@styles/appbar"

const StyledCard = styled(Card)(() => {
  const { themeMode } = UseThemMode()

  return {
    maxWidth: "100%",
    borderRadius: "16px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
    boxShadow:
      themeMode === "dark"
        ? "0 8px 24px rgba(251, 191, 36, 0.15)"
        : "0 8px 24px rgba(245, 158, 11, 0.12)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow:
        themeMode === "dark"
          ? "0 12px 32px rgba(251, 191, 36, 0.25)"
          : "0 12px 32px rgba(245, 158, 11, 0.2)",
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.3)"
          : "rgba(245, 158, 11, 0.3)",
    },
  }
})

const StyledCardMedia = styled(CardMedia)(() => {
  const { themeMode } = UseThemMode()

  return {
    height: "280px",
    position: "relative",
    transition: "transform 0.4s ease",

    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        themeMode === "dark"
          ? "linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 100%)"
          : "linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.3) 100%)",
      pointerEvents: "none",
    },

    ".MuiCardActionArea-root:hover &": {
      transform: "scale(1.05)",
    },
  }
})

const StyledCardContent = styled(CardContent)(() => {
  const { themeMode } = UseThemMode()

  return {
    padding: "24px",
    background:
      themeMode === "dark"
        ? "rgba(30, 41, 59, 0.5)"
        : "rgba(255, 255, 255, 0.9)",
  }
})

const SocialIconButton = styled(IconButton)(() => {
  const { themeMode } = UseThemMode()

  return {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    color: themeMode === "dark" ? "#cbd5e1" : "#475569",

    "&:hover": {
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
          : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      color: "#ffffff",
      transform: "translateY(-4px) scale(1.1)",
      boxShadow:
        themeMode === "dark"
          ? "0 6px 16px rgba(251, 191, 36, 0.4)"
          : "0 6px 16px rgba(245, 158, 11, 0.4)",
    },
  }
})

function Team() {
  const { isMatch } = UseMediaQueryHook()
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: false })
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: false })

  const teamMembers = [
    {
      name: t("mahmoud-ali"),
      faculty: t("faculty-mahmoud"),
      job: t("job-mahmoud"),
      image: teamImage[0],
      alt: "Mahmoud Ali",
      links: {
        linkedin: "https://www.linkedin.com/in/mahmoudali-webdev/",
        github: "https://github.com/mahmoudAliaboElhassan",
        website: "https://mahmoud-ali-ze8h.vercel.app/",
      },
    },
    {
      name: t("mohammed-abdelaleem"),
      faculty: t("faculty-mohammed"),
      job: t("job-mohammed"),
      image: teamImage[1],
      alt: "Mohammed Abd Elaleem",
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-abdelaleem-0505431ab",
        github: "https://github.com/mohamedAbdelaleem",
      },
    },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{
        overflow: "hidden",
        paddingY: "60px",
      }}
    >
      <AppbarHeader sx={{ marginBottom: "48px" }}>
        {t("people-developed")}
      </AppbarHeader>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => {
          const ref = index === 0 ? ref1 : ref2
          const inView = index === 0 ? inView1 : inView2

          return (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                ref={ref}
                initial={{
                  y: isMatch ? (index === 0 ? -50 : 50) : 0,
                  x: isMatch ? 0 : index === 0 ? -50 : 50,
                  opacity: 0,
                }}
                animate={inView ? { y: 0, x: 0, opacity: 1 } : {}}
                transition={{ duration: isMatch ? 1 + index * 0.2 : 1.5 }}
              >
                <StyledCard>
                  <CardActionArea>
                    <StyledCardMedia
                      component="img"
                      image={member.image}
                      alt={member.alt}
                    />
                    <StyledCardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                          fontSize: {
                            xs: "20px",
                            sm: "22px",
                            md: "24px",
                            lg: "28px",
                          },
                          fontWeight: 700,
                          color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
                          marginBottom: "8px",
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        gutterBottom
                        sx={{
                          fontSize: {
                            xs: "14px",
                            sm: "15px",
                            md: "16px",
                            lg: "18px",
                          },
                          fontWeight: 500,
                          color: themeMode === "dark" ? "#94a3b8" : "#64748b",
                          marginBottom: "12px",
                        }}
                      >
                        {member.faculty}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          fontSize: {
                            xs: "13px",
                            sm: "14px",
                            md: "15px",
                          },
                          color: themeMode === "dark" ? "#cbd5e1" : "#475569",
                          lineHeight: 1.6,
                        }}
                      >
                        {member.job}
                      </Typography>
                    </StyledCardContent>
                  </CardActionArea>

                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "12px",
                      padding: "20px",
                      background:
                        themeMode === "dark"
                          ? "rgba(15, 23, 42, 0.6)"
                          : "rgba(248, 250, 252, 0.8)",
                    }}
                  >
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("linkedin")}
                    >
                      <SocialIconButton>
                        <LinkedInIcon sx={{ fontSize: "24px" }} />
                      </SocialIconButton>
                    </a>

                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("github")}
                    >
                      <SocialIconButton>
                        <GitHubIcon sx={{ fontSize: "24px" }} />
                      </SocialIconButton>
                    </a>

                    {member.links.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t("website")}
                      >
                        <SocialIconButton>
                          <PersonIcon sx={{ fontSize: "24px" }} />
                        </SocialIconButton>
                      </a>
                    )}
                  </CardActions>
                </StyledCard>
              </motion.div>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Team

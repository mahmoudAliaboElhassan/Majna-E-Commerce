import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import MailIcon from "@mui/icons-material/Mail"
import PhoneIcon from "@mui/icons-material/Phone"
import { useTranslation } from "react-i18next"
import { Typography, Box, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"

import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"

const SocialCard = styled(Box)(() => {
  const { themeMode } = UseThemMode()

  return {
    padding: "32px",
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
    transition: "all 0.3s ease",

    "&:hover": {
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.25)"
          : "rgba(245, 158, 11, 0.25)",
      boxShadow:
        themeMode === "dark"
          ? "0 12px 32px rgba(251, 191, 36, 0.2)"
          : "0 12px 32px rgba(245, 158, 11, 0.18)",
    },
  }
})

const ContactLink = styled("a")(() => {
  const { themeMode } = UseThemMode()
  const { Direction } = UseDirection()

  return {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    color: themeMode === "dark" ? "#cbd5e1" : "#475569",
    fontSize: "15px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    background: "transparent",
    border: `1px solid transparent`,

    "&:hover": {
      background:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.1)"
          : "rgba(245, 158, 11, 0.08)",
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.2)"
          : "rgba(245, 158, 11, 0.2)",
      color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
      transform: "translateX(4px)",

      "& .MuiSvgIcon-root": {
        color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
      },
    },

    "& .MuiSvgIcon-root": {
      [Direction.marginRight]: "12px",
      transition: "color 0.3s ease",
    },
  }
})

const SectionTitle = styled(Typography)(() => {
  const { themeMode } = UseThemMode()

  return {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: 700,
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "20px",
    letterSpacing: "1px",
  }
})

function SocialMedia() {
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()

  const contacts = [
    {
      name: t("mahmoud-contact"),
      links: [
        {
          icon: <GitHubIcon sx={{ fontSize: "24px" }} />,
          label: t("github"),
          url: "https://github.com/mahmoudAliaboElhassan",
        },
        {
          icon: <LinkedInIcon sx={{ fontSize: "24px" }} />,
          label: t("linkedin"),
          url: "https://www.linkedin.com/in/mahmoudali-webdev/",
        },
        {
          icon: <MailIcon sx={{ fontSize: "24px" }} />,
          label: "ml6893254@gmail.com",
          url: "mailto:ml6893254@gmail.com",
        },
        {
          icon: <PhoneIcon sx={{ fontSize: "24px" }} />,
          label: "+201152821902",
          url: "tel:01152821902",
        },
      ],
    },
    {
      name: t("mohammed-contact"),
      links: [
        {
          icon: <GitHubIcon sx={{ fontSize: "24px" }} />,
          label: t("github"),
          url: "https://github.com/mohamedAbdelaleem",
        },
        {
          icon: <LinkedInIcon sx={{ fontSize: "24px" }} />,
          label: t("linkedin"),
          url: "https://www.linkedin.com/in/mohamed-abdelaleem-0505431ab",
        },
        {
          icon: <MailIcon sx={{ fontSize: "24px" }} />,
          label: "mohamedabdelaleem305@gmail.com",
          url: "mailto:mohamedabdelaleem305@gmail.com",
        },
        {
          icon: <PhoneIcon sx={{ fontSize: "24px" }} />,
          label: "+201019663158",
          url: "tel:01019663158",
        },
      ],
    },
  ]

  return (
    <SocialCard>
      {contacts.map((contact, index) => (
        <Box key={index}>
          <SectionTitle>{contact.name}</SectionTitle>
          {contact.links.map((link, linkIndex) => (
            <ContactLink
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              data-aos="fade-left"
              data-aos-delay={linkIndex * 100}
            >
              {link.icon}
              {link.label}
            </ContactLink>
          ))}
          {index < contacts.length - 1 && (
            <Divider
              sx={{
                marginY: "24px",
                borderColor:
                  themeMode === "dark"
                    ? "rgba(251, 191, 36, 0.15)"
                    : "rgba(245, 158, 11, 0.15)",
              }}
            />
          )}
        </Box>
      ))}
    </SocialCard>
  )
}

export default SocialMedia

import React from 'react'

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";

function ContactInfo() {
    const { t } = useTranslation()
    const { Direction } = UseDirection()
    const { themeMode } = UseThemMode()
    return (
        <Card style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
            <Typography style={{
                textAlign: "center",
                fontSize: "25px",
                textShadow: `${themeMode === "dark" ? "rgb(12, 141, 77)" : "rgb(125 133 131)"} 2px 6px 5px`,
                marginBottom: "8px",
                letterSpacing: "5px"
            }}>{t('mahmoud-contact')}</Typography>
            <a href="https://github.com/mahmoudAliaboElhassan" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} data-aos="fade-down" data-aos-delay="100" title={t("github")}>
                <GitHubIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap",
                    [Direction.marginRight]: "10px"
                }} />
                {t('github')}
            </a>
            <a href="https://www.linkedin.com/in/mahmoud-ali-a99713237/" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} data-aos="fade-down" data-aos-delay="200" title={t("linkedin")}>
                <LinkedInIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                {t('linkedin')}
            </a>
            <a href="mailto:ml6893254@gmail.com" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} data-aos="fade-down" data-aos-delay="300" title={t('email')}>
                <MailIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                ml6893254@gmail.com
            </a>
            <a href="tel:01152821902" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} data-aos="fade-down" data-aos-delay="400" title={t('phone')}>
                <PhoneIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                +201152821902
            </a>
            <hr />
            <Typography style={{
                textAlign: "center",
                fontSize: "25px",
                textShadow: `${themeMode === "dark" ? "rgb(12, 141, 77)" : "rgb(125 133 131)"} 2px 6px 5px`,
                marginBottom: "8px",
                letterSpacing: "5px"
            }}>
                {t('mohammed-contact')}</Typography>
            <a href="https://github.com/mohamedAbdelaleem" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} title={t("github")} data-aos="fade-down" data-aos-delay="500">
                <GitHubIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                {t('github')}
            </a>
            <a href="https://www.linkedin.com/in/mohamed-abdelaleem-0505431ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} title={t("linkedin")} data-aos="fade-down" data-aos-delay="600">
                <LinkedInIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                {t('linkedin')}
            </a>
            <a href="mailto:mohamedabdelaleem305@gmail.com" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} title={t("email")} data-aos="fade-down" data-aos-delay="700">
                <MailIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                mohamedabdelaleem305@gmail.com
            </a>
            <a href="tel:01019663158" target="_blank" style={{ marginBottom: "12px", display: "flex", alignItems: "center" }} title={t("phone")} >
                <PhoneIcon sx={{
                    fontSize: {
                        xs: "1.5em",
                        sm: "1.75em",
                        md: "2em",
                    },
                    whiteSpace: "nowrap", [Direction.marginRight]: "10px"
                }} />
                01019663158
            </a>
        </Card>
    )
}

export default ContactInfo

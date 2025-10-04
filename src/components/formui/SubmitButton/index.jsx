import React from "react"
import { Button, CircularProgress, Box } from "@mui/material"
import { useFormikContext } from "formik"
import { useTranslation } from "react-i18next"

import UseLoadingStatus from "@hooks/use-loading-satatus"
import UseThemMode from "@hooks/use-theme"

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { t } = useTranslation()
  const { submitForm } = useFormikContext()
  const { themeMode } = UseThemMode()
  const loadingStatus = UseLoadingStatus()

  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm()
  }

  const buttonStyles = {
    py: 1.5,
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "10px",
    textTransform: "none",
    position: "relative",
    background:
      themeMode === "light"
        ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    color: "#ffffff",
    border: "none",
    boxShadow:
      themeMode === "light"
        ? "0 4px 12px rgba(245, 158, 11, 0.3)"
        : "0 4px 12px rgba(251, 191, 36, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      background:
        themeMode === "light"
          ? "linear-gradient(135deg, #d97706 0%, #b45309 100%)"
          : "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)",
      transform: loadingStatus ? "none" : "translateY(-2px)",
      boxShadow:
        themeMode === "light"
          ? "0 6px 16px rgba(245, 158, 11, 0.4)"
          : "0 6px 16px rgba(251, 191, 36, 0.4)",
    },
    "&:active": {
      transform: loadingStatus ? "none" : "translateY(0)",
    },
    "&.Mui-disabled": {
      background:
        themeMode === "light"
          ? "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)"
          : "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
      color: themeMode === "light" ? "#ffffff" : "#9ca3af",
      cursor: "not-allowed",
      opacity: 0.6,
    },
    ...otherProps.sx,
  }

  const configButton = {
    fullWidth: true,
    type: "submit",
    disabled: loadingStatus,
    onClick: handleSubmit,
  }

  return (
    <Button sx={buttonStyles} {...configButton} {...otherProps}>
      {loadingStatus ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <CircularProgress
            size={20}
            sx={{
              color: "#ffffff",
            }}
          />
          <span>{t("loading") || "Loading..."}</span>
        </Box>
      ) : (
        children
      )}
    </Button>
  )
}

export default ButtonWrapper

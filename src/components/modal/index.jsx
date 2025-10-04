import React, { useState, useEffect } from "react"
import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Fade,
  Backdrop,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  StorefrontOutlined,
  PersonOutlineOutlined,
  CheckCircleOutline,
} from "@mui/icons-material"

import UseMediaQueryHook from "@hooks/use-media-query"
import UseThemMode from "@hooks/use-theme"

function ModalSignup({ open_modal, close }) {
  const [type, setType] = useState("customer")
  const { t } = useTranslation()
  const { isMatch } = UseMediaQueryHook()
  const { themeMode } = UseThemMode()
  const [typeLabel, setTypeLabel] = useState(t("customer"))

  const handleTypeChange = (event) => {
    const selectedType = event.target.value
    setType(selectedType)
    setTypeLabel(t(selectedType))
  }

  useEffect(() => {
    localStorage.setItem("type", type)
  }, [type])

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMatch ? "95%" : "90%",
    maxWidth: "700px",
    maxHeight: "90vh",
    bgcolor: themeMode === "light" ? "#ffffff" : "#1e293b",
    borderRadius: "16px",
    boxShadow:
      themeMode === "light"
        ? "0 8px 32px rgba(0, 0, 0, 0.12)"
        : "0 8px 32px rgba(0, 0, 0, 0.6)",
    border: `1px solid ${
      themeMode === "light" ? "#e5e7eb" : "rgba(251, 191, 36, 0.15)"
    }`,
    p: 0,
    overflow: "hidden",
  }

  const headerStyle = {
    background:
      themeMode === "light"
        ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
        : "linear-gradient(135deg, #292524 0%, #1c1917 100%)",
    borderBottom: `2px solid ${themeMode === "light" ? "#f59e0b" : "#fbbf24"}`,
    p: 3,
    textAlign: "center",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background:
        themeMode === "light"
          ? "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)"
          : "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
    },
  }

  const cardStyle = (isSelected) => ({
    p: 3,
    height: "100%",
    cursor: "pointer",
    borderRadius: "12px",
    border: `2px solid ${
      isSelected
        ? themeMode === "light"
          ? "#f59e0b"
          : "#fbbf24"
        : themeMode === "light"
        ? "#e5e7eb"
        : "#334155"
    }`,
    background: isSelected
      ? themeMode === "light"
        ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
        : "linear-gradient(135deg, #292524 0%, #1c1917 100%)"
      : themeMode === "light"
      ? "#ffffff"
      : "#1e293b",
    boxShadow: isSelected
      ? themeMode === "light"
        ? "0 4px 20px rgba(245, 158, 11, 0.2)"
        : "0 4px 20px rgba(251, 191, 36, 0.2)"
      : "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    "&:hover": {
      borderColor: themeMode === "light" ? "#f59e0b" : "#fbbf24",
      transform: "translateY(-4px)",
      boxShadow:
        themeMode === "light"
          ? "0 8px 24px rgba(245, 158, 11, 0.15)"
          : "0 8px 24px rgba(251, 191, 36, 0.15)",
    },
  })

  const iconStyle = (isSelected) => ({
    fontSize: 48,
    color: isSelected
      ? themeMode === "light"
        ? "#f59e0b"
        : "#fbbf24"
      : themeMode === "light"
      ? "#9ca3af"
      : "#64748b",
    mb: 2,
    transition: "all 0.3s ease",
  })

  return (
    <Modal
      open={open_modal}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor:
            themeMode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Fade in={open_modal}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box sx={headerStyle}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: themeMode === "light" ? "#78350f" : "#fbbf24",
                mb: 1,
              }}
            >
              {t("create-account") || "Create Account"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: themeMode === "light" ? "#92400e" : "#fde68a",
                opacity: 0.9,
              }}
            >
              {t("select-type")}
            </Typography>
          </Box>

          {/* Content */}
          <Box
            sx={{ p: 3, maxHeight: "calc(90vh - 180px)", overflowY: "auto" }}
          >
            <FormControl fullWidth>
              <RadioGroup
                value={type}
                onChange={handleTypeChange}
                name="account-type"
              >
                <Grid container spacing={3}>
                  {/* Distributor Card */}
                  <Grid item xs={12} md={6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        raised
                        sx={cardStyle(type === "distributor")}
                        onClick={() => {
                          setType("distributor")
                          setTypeLabel(t("distributor"))
                        }}
                      >
                        {type === "distributor" && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                            }}
                          >
                            <CheckCircleOutline
                              sx={{
                                color:
                                  themeMode === "light" ? "#f59e0b" : "#fbbf24",
                                fontSize: 28,
                              }}
                            />
                          </Box>
                        )}

                        <Box sx={{ textAlign: "center" }}>
                          <StorefrontOutlined
                            sx={iconStyle(type === "distributor")}
                          />

                          <FormControlLabel
                            value="distributor"
                            control={
                              <Radio
                                sx={{
                                  color:
                                    themeMode === "light"
                                      ? "#d1d5db"
                                      : "#475569",
                                  "&.Mui-checked": {
                                    color:
                                      themeMode === "light"
                                        ? "#f59e0b"
                                        : "#fbbf24",
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color:
                                    type === "distributor"
                                      ? themeMode === "light"
                                        ? "#78350f"
                                        : "#fbbf24"
                                      : themeMode === "light"
                                      ? "#374151"
                                      : "#cbd5e1",
                                }}
                              >
                                {t("distributor")}
                              </Typography>
                            }
                            sx={{
                              mb: 1,
                              justifyContent: "center",
                              width: "100%",
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "light" ? "#6b7280" : "#94a3b8",
                              lineHeight: 1.6,
                            }}
                          >
                            {t("distributor_description")}
                          </Typography>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>

                  {/* Customer Card */}
                  <Grid item xs={12} md={6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        raised
                        sx={cardStyle(type === "customer")}
                        onClick={() => {
                          setType("customer")
                          setTypeLabel(t("customer"))
                        }}
                      >
                        {type === "customer" && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                            }}
                          >
                            <CheckCircleOutline
                              sx={{
                                color:
                                  themeMode === "light" ? "#f59e0b" : "#fbbf24",
                                fontSize: 28,
                              }}
                            />
                          </Box>
                        )}

                        <Box sx={{ textAlign: "center" }}>
                          <PersonOutlineOutlined
                            sx={iconStyle(type === "customer")}
                          />

                          <FormControlLabel
                            value="customer"
                            control={
                              <Radio
                                sx={{
                                  color:
                                    themeMode === "light"
                                      ? "#d1d5db"
                                      : "#475569",
                                  "&.Mui-checked": {
                                    color:
                                      themeMode === "light"
                                        ? "#f59e0b"
                                        : "#fbbf24",
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color:
                                    type === "customer"
                                      ? themeMode === "light"
                                        ? "#78350f"
                                        : "#fbbf24"
                                      : themeMode === "light"
                                      ? "#374151"
                                      : "#cbd5e1",
                                }}
                              >
                                {t("customer")}
                              </Typography>
                            }
                            sx={{
                              mb: 1,
                              justifyContent: "center",
                              width: "100%",
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "light" ? "#6b7280" : "#94a3b8",
                              lineHeight: 1.6,
                            }}
                          >
                            {t("customer_description")}
                          </Typography>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>

                  {/* Action Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      to="/signup"
                      onClick={close}
                      sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        borderRadius: "10px",
                        textTransform: "none",
                        background:
                          themeMode === "light"
                            ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                            : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                        boxShadow:
                          themeMode === "light"
                            ? "0 4px 12px rgba(245, 158, 11, 0.3)"
                            : "0 4px 12px rgba(251, 191, 36, 0.3)",
                        "&:hover": {
                          background:
                            themeMode === "light"
                              ? "linear-gradient(135deg, #d97706 0%, #b45309 100%)"
                              : "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)",
                          transform: "translateY(-2px)",
                          boxShadow:
                            themeMode === "light"
                              ? "0 6px 16px rgba(245, 158, 11, 0.4)"
                              : "0 6px 16px rgba(251, 191, 36, 0.4)",
                        },
                      }}
                    >
                      {t("create_account")} {typeLabel}
                    </Button>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default React.memo(ModalSignup)

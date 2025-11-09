import React from "react"
import { Container, Grid, Typography, Box } from "@mui/material"
import Card from "@mui/material/Card"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { VpnKeyOutlined } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"

import PasswordField from "@components/formui/passwordField"
import ButtonWrapper from "@components/formui/SubmitButton"
import UseFormValidation from "@formValidation/use-form-validation"
import UseThemMode from "@hooks/use-theme"
import UseInitialValues from "@utils/use-initial-values"
import { resetPassword } from "@state/slices/auth"
import withGuard from "@utils/withGuard"
import {
  cardStyles,
  formWrapperStyles,
  headerBoxStyles,
} from "../../../styles/forms"

const { INITIAL_FORM_STATE_RESET_PASSWORD } = UseInitialValues()

function ResetPassword() {
  const dispatch = useDispatch()
  const { FORM_VALIDATION_SCHEMA_RESET_PASSWORD } = UseFormValidation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uid, token } = useParams()
  const { themeMode } = UseThemMode()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          width: "100%",
          maxWidth: "480px",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card raised sx={cardStyles(themeMode)}>
            {/* Header Section */}
            <Box sx={headerBoxStyles(themeMode)}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background:
                      themeMode === "light"
                        ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                        : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    boxShadow:
                      themeMode === "light"
                        ? "0 4px 20px rgba(245, 158, 11, 0.3)"
                        : "0 4px 20px rgba(251, 191, 36, 0.4)",
                  }}
                >
                  <VpnKeyOutlined
                    sx={{
                      fontSize: 32,
                      color: themeMode === "light" ? "#ffffff" : "#1e1e1e",
                    }}
                  />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: themeMode === "light" ? "#78350f" : "#fbbf24",
                    mb: 0.5,
                  }}
                >
                  {t("reset-password")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: themeMode === "light" ? "#92400e" : "#fde68a",
                    opacity: 0.9,
                    fontSize: "0.875rem",
                  }}
                >
                  {t("reset-password-subtitle") ||
                    "Enter your new password below"}
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={formWrapperStyles}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE_RESET_PASSWORD }}
                validationSchema={FORM_VALIDATION_SCHEMA_RESET_PASSWORD}
                onSubmit={(values) => {
                  dispatch(
                    resetPassword({
                      password: values.password,
                      uid,
                      token,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      toast.success(t("reset-success"), {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: themeMode,
                      })
                      setTimeout(() => {
                        navigate("/login")
                      }, 1000)
                    })
                    .catch((error) => {
                      console.error("Reset password error:", error)
                      Swal.fire({
                        title: t("error-reset"),
                        text: t("error-reset-text"),
                        icon: "error",
                        confirmButtonColor:
                          themeMode === "light" ? "#f59e0b" : "#fbbf24",
                        confirmButtonText: t("ok"),
                      })
                    })
                }}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <PasswordField
                        name="password"
                        label={t("new-password")}
                        autoComplete="new-password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper>{t("reset")}</ButtonWrapper>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default withGuard(ResetPassword)

import React from "react"
import { Container, Grid, Typography, Box } from "@mui/material"
import Card from "@mui/material/Card"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { LockOutlined } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"

import ButtonWrapper from "@components/formui/SubmitButton"
import PasswordField from "@components/formui/passwordField"
import AuthLink from "@components/formui/authLink"
import UseThemMode from "@hooks/use-theme"
import UseInitialValues from "@utils/use-initial-values"
import UseFormValidation from "@formValidation/use-form-validation"
import { changePassword, logOut } from "@state/slices/auth"
import withGuard from "@utils/withGuard"
import {
  cardStyles,
  formWrapperStyles,
  headerBoxStyles,
} from "../../../styles/forms"

const { INITIAL_FORM_STATE_CHANGE_PASSWORD } = UseInitialValues()

function ChangePassword() {
  const dispatch = useDispatch()
  const { FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD } = UseFormValidation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { Uid } = useSelector((state) => state.auth)
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
                  <LockOutlined
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
                  {t("change-password-heading")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: themeMode === "light" ? "#92400e" : "#fde68a",
                    opacity: 0.9,
                    fontSize: "0.875rem",
                  }}
                >
                  {t("change-password-subtitle") ||
                    "Update your password to keep your account secure"}
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={formWrapperStyles}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE_CHANGE_PASSWORD,
                }}
                validationSchema={FORM_VALIDATION_SCHEMA_CHANGE_PASSWORD}
                onSubmit={(values) => {
                  dispatch(
                    changePassword({
                      userId: Uid,
                      current_password: values.currentPassword,
                      new_password: values.newPassword,
                      re_new_password: values.confirm_newPassword,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      toast.success(t("change-password-success"), {
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
                        navigate("/")
                      }, 1000)
                    })
                    .catch((error) => {
                      if (error.response?.status === 400) {
                        Swal.fire({
                          title: t("error-change-password"),
                          text: t("error-change-password-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                          confirmButtonColor:
                            themeMode === "light" ? "#f59e0b" : "#fbbf24",
                        })
                      }
                      if (error.response?.status === 404) {
                        Swal.fire({
                          title: t("error-change-password"),
                          text: t("error-change-password-not-user-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                          confirmButtonColor:
                            themeMode === "light" ? "#f59e0b" : "#fbbf24",
                        })
                      }
                    })
                }}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <PasswordField
                        name="currentPassword"
                        label={t("current-password")}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <PasswordField
                        name="newPassword"
                        label={t("new-password")}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <PasswordField
                        name="confirm_newPassword"
                        label={t("confirm-new-password")}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper>{t("change-password")}</ButtonWrapper>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          color: themeMode === "light" ? "#6b7280" : "#9ca3af",
                          mt: -0.5,
                        }}
                      >
                        <AuthLink>
                          <Typography
                            component={Link}
                            onClick={() => dispatch(logOut())}
                            sx={{
                              color:
                                themeMode === "light" ? "#f59e0b" : "#fbbf24",
                              fontWeight: 600,
                              textDecoration: "none",
                              fontSize: "0.875rem",
                              cursor: "pointer",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {t("logout")}
                          </Typography>
                        </AuthLink>
                      </Box>
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

export default withGuard(ChangePassword)

import { Container, Grid, Typography, Box } from "@mui/material"
import Card from "@mui/material/Card"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { LockResetOutlined } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"

import TextFieldWrapper from "@components/formui/textField"
import ButtonWrapper from "@components/formui/SubmitButton"
import AuthLink from "@components/formui/authLink"
import UseFormValidation from "@formValidation/use-form-validation"
import UseThemMode from "@hooks/use-theme"
import UseInitialValues from "@utils/use-initial-values"
import { forgetPassword } from "@state/slices/auth"
import withGuard from "@utils/withGuard"

const { INITIAL_FORM_STATE_FORGET_PASSWORD } = UseInitialValues()

function ForgetPassword() {
  const dispatch = useDispatch()
  const { FORM_VALIDATION_SCHEMA_FORGET_PASSWORD } = UseFormValidation()
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()

  const containerStyles = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "480px",
    px: 2,
  }

  const cardStyles = {
    background:
      themeMode === "light"
        ? "#ffffff"
        : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    borderRadius: "16px",
    boxShadow:
      themeMode === "light"
        ? "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
        : "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(251, 191, 36, 0.1)",
    border: `1px solid ${
      themeMode === "light" ? "#e5e7eb" : "rgba(251, 191, 36, 0.15)"
    }`,
    overflow: "hidden",
  }

  const headerBoxStyles = {
    background:
      themeMode === "light"
        ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
        : "linear-gradient(135deg, #292524 0%, #1c1917 100%)",
    borderBottom: `2px solid ${themeMode === "light" ? "#f59e0b" : "#fbbf24"}`,
    py: 4,
    px: 3,
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

  const formWrapperStyles = {
    py: 4,
    px: 3,
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background:
          themeMode === "light"
            ? "#ffffff"
            : "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={containerStyles}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card raised sx={cardStyles}>
            {/* Header Section */}
            <Box sx={headerBoxStyles}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      themeMode === "light"
                        ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                        : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow:
                      themeMode === "light"
                        ? "0 4px 20px rgba(245, 158, 11, 0.3)"
                        : "0 4px 20px rgba(251, 191, 36, 0.4)",
                  }}
                >
                  <LockResetOutlined
                    sx={{
                      fontSize: 40,
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
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: themeMode === "light" ? "#78350f" : "#fbbf24",
                    mb: 1,
                  }}
                >
                  {t("forget-password-heading")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: themeMode === "light" ? "#92400e" : "#fde68a",
                    opacity: 0.9,
                    maxWidth: "90%",
                    margin: "0 auto",
                  }}
                >
                  {t("forget-password-subtitle") ||
                    "Enter your email to receive a password reset link"}
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={formWrapperStyles}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE_FORGET_PASSWORD }}
                validationSchema={FORM_VALIDATION_SCHEMA_FORGET_PASSWORD}
                onSubmit={(values) => {
                  dispatch(forgetPassword({ email: values.email }))
                    .unwrap()
                    .then(() => {
                      toast.success(t("check-inbox-reset"), {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: themeMode,
                      })
                    })
                    .catch((error) => {
                      Swal.fire({
                        title: t("error-forget-dispatch"),
                        text: t("error-forget-dispatch-text"),
                        icon: "error",
                        confirmButtonText: t("ok"),
                        confirmButtonColor:
                          themeMode === "light" ? "#f59e0b" : "#fbbf24",
                      })
                    })
                }}
              >
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="email"
                        label={t("email")}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper>{t("forget-password-btn")}</ButtonWrapper>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <AuthLink>
                          <Typography
                            component={Link}
                            to="/"
                            sx={{
                              color:
                                themeMode === "light" ? "#6b7280" : "#9ca3af",
                              fontWeight: 500,
                              fontSize: "0.875rem",
                              textDecoration: "none",
                              "&:hover": {
                                color:
                                  themeMode === "light" ? "#f59e0b" : "#fbbf24",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {t("go-back")}
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

export default withGuard(ForgetPassword)

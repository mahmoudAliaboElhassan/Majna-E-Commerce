import React, { useCallback, useEffect, useState } from "react"
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

import { getCarts } from "@state/slices/cart"
import TextFieldWrapper from "@components/formui/textField"
import ButtonWrapper from "@components/formui/SubmitButton"
import PasswordField from "@components/formui/passwordField"
import AuthLink from "@components/formui/authLink"
import ModalSignup from "@components/modal"
import UseFormValidation from "@formValidation/use-form-validation"
import UseInitialValues from "@utils/use-initial-values"
import UseThemMode from "@hooks/use-theme"
import { ResendConfirmation, logIn } from "@state/slices/auth"

import "react-toastify/dist/ReactToastify.css"

const { INITIAL_FORM_STATE_Login } = UseInitialValues()

function Login() {
  const dispatch = useDispatch()
  const { token, role } = useSelector((state) => state.auth)
  const { FORM_VALIDATION_SCHEMA_Login } = UseFormValidation()
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()
  const navigate = useNavigate()

  const [open_modal, setOpenModal] = useState(false)
  const [email, setEmail] = useState(null)

  const handleCloseModal = useCallback(() => setOpenModal(false), [])

  useEffect(() => {
    if (token) {
      if (role === "reviewer") {
        navigate("/reviewer")
      } else if (role === "distributor" || role === "customer") {
        navigate("/")
      }
    }
  }, [token, role, navigate])

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
                  <LockOutlined
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
                  {t("login-now")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: themeMode === "light" ? "#92400e" : "#fde68a",
                    opacity: 0.9,
                  }}
                >
                  {t("welcome-back") ||
                    "Welcome back! Please login to continue"}
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={formWrapperStyles}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE_Login }}
                validationSchema={FORM_VALIDATION_SCHEMA_Login}
                onSubmit={(values) => {
                  setEmail(values.email)
                  dispatch(
                    logIn({
                      email: values.email,
                      password: values.password,
                    })
                  )
                    .unwrap()
                    .then((data) => {
                      const userRole = data?.user?.user_role

                      if (userRole === "reviewer") {
                        navigate("/reviewer")
                      } else {
                        navigate("/")
                      }

                      if (userRole === "Customer") {
                        dispatch(getCarts({ id: data?.user?.id }))
                      }

                      toast.success(t("login-success"), {
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
                      if (error.message === "timeout exceeded") {
                        Swal.fire({
                          title: t("error-data"),
                          text: t("error-data-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                          confirmButtonColor: "#f59e0b",
                        })
                      } else if (error.response?.status === 403) {
                        Swal.fire({
                          title: t("error-activate"),
                          text: t("error-activate-text"),
                          icon: "error",
                          showCancelButton: true,
                          confirmButtonColor:
                            themeMode === "light" ? "#f59e0b" : "#fbbf24",
                          confirmButtonText: t("send"),
                          cancelButtonColor: "#dc2626",
                          cancelButtonText: t("cancel"),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(ResendConfirmation({ email }))
                              .unwrap()
                              .then(() => {
                                toast.success(t("check-inbox"), {
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
                          }
                        })
                      } else if (error.response?.status === 400) {
                        Swal.fire({
                          title: t("error-data"),
                          text: t("error-data-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                          confirmButtonColor: "#f59e0b",
                        })
                      }
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
                      <PasswordField
                        name="password"
                        label={t("password")}
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper>{t("login")}</ButtonWrapper>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          color: themeMode === "light" ? "#6b7280" : "#9ca3af",
                        }}
                      >
                        <Typography component="span" variant="body2">
                          {t("have-account")}
                        </Typography>{" "}
                        <AuthLink>
                          <Typography
                            component={Link}
                            onClick={() => setOpenModal(!open_modal)}
                            sx={{
                              color:
                                themeMode === "light" ? "#f59e0b" : "#fbbf24",
                              fontWeight: 600,
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {t("signup")}
                          </Typography>
                        </AuthLink>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ textAlign: "center" }}>
                        <AuthLink>
                          <Typography
                            component={Link}
                            to="/forget-password"
                            sx={{
                              color:
                                themeMode === "light" ? "#f59e0b" : "#fbbf24",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {t("forget-password")}
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

        <ModalSignup open_modal={open_modal} close={handleCloseModal} />
      </Container>
    </Box>
  )
}

export default Login

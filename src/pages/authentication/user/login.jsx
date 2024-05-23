import React, { useCallback, useState } from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import TextFieldWrapper from "@components/formui/textField";
import ButtonWrapper from "@components/formui/SubmitButton";
import PasswordField from "@components/formui/passwordField";
import ModalSignup from "@components/Modal";
import UseFormValidation from "@formValidation/use-form-validation";
import UseThemMode from "@hooks/use-theme";
import UseInitialValues from "@utils/use-initial-values";
import { ResendConfirmation, logIn } from "@state/slices/auth";
import { AppbarHeader } from "@styles/appbar";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
const { INITIAL_FORM_STATE_Login } = UseInitialValues();

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { FORM_VALIDATION_SCHEMA_Login } = UseFormValidation();
  const { t } = useTranslation();
  const [open_modal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const { themeMode } = UseThemMode();
  const handleCloseModal = useCallback(() => setOpenModal(false), []);
  return (
    <Container maxWidth="sm" className={classes.containerWrapper}>
      <ToastContainer />
      <Card raised>
        <Container maxWidth="md">
          <Grid container>
            <Grid item={12}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE_Login,
                }}
                validationSchema={FORM_VALIDATION_SCHEMA_Login}
                onSubmit={(values) => {
                  setEmail(values.email);
                  dispatch(
                    logIn({
                      email: values.email,
                      password: values.password,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      {
                        toast.success(t("login-success"), {
                          position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: themeMode,
                        });
                      }
                    })
                    .catch((error) => {
                      if (error.message === "timeout exceeded") {
                        console.log("Error:", error.message);
                        Swal.fire({
                          title: t("error-data"),
                          text: t("error-data-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                        });
                      } else if (error.response.status === 403) {
                        Swal.fire({
                          title: t("error-activate"),
                          text: t("error-activate-text"),
                          icon: "error",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: t("send"),
                          cancelButtonColor: "#d33",
                          cancelButtonText: t("cancel"),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(ResendConfirmation({ email }))
                              .unwrap()
                              .then(() => {
                                {
                                  toast.success(t("check-inbox"), {
                                    position: "top-right",
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: themeMode,
                                  });
                                  setTimeout(() => {
                                    console.log("hello");
                                  }, 1000);
                                }
                              });
                          }
                        });
                      } else if (error.response.status === 400) {
                        console.log("Error:", error.message);
                        Swal.fire({
                          title: t("error-data"),
                          text: t("error-data-text"),
                          icon: "error",
                          confirmButtonText: t("ok"),
                        });
                      }
                    });
                }}
              >
                <Form className={classes.formWrapper}>
                  {setTimeout(() => {
                    role === "reviewer"
                      ? navigate("/reviewer")
                      : (role === "distributor" || role === "customer") &&
                        navigate("/");
                  }, 1000)}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <motion.div
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                        >
                          <AppbarHeader>{t("login-now")}</AppbarHeader>
                        </motion.div>
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        name="email"
                        label={t("email")}
                        autocomplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <PasswordField
                        name="password"
                        label={t("password")}
                        autocomplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWrapper>{t("login")}</ButtonWrapper>{" "}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography component="span">
                        {t("have-account")}
                      </Typography>{" "}
                      <Typography
                        component={Link}
                        onClick={() => setOpenModal(!open_modal)}
                      >
                        {t("signup")}
                      </Typography>{" "}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Typography component={Link} to={"/forget-password"}>
                        {t("forget-password")}
                      </Typography>{" "}
                    </Grid>
                  </Grid>{" "}
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Container>
      </Card>
      <ModalSignup open_modal={open_modal} close={handleCloseModal} />
    </Container>
  );
}

export default Login;

import React from "react";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import PasswordField from "../../../components/formui/passwordField";
import ButtonWrapper from "../../../components/formui/SubmitButton";
import UseFormValidation from "../../../formValidation/use-form-validation";
import UseThemMode from "../../../hooks/use-theme";
import UseInitialValues from "../../../utils/use-initial-values";
import { resetPassword } from "../../../state/slices/auth";
import { AppbarHeader } from "../../../styles/appbar";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
const { INITIAL_FORM_STATE_RESET_PASSWORD } = UseInitialValues();
function ResetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_RESET_PASSWORD } = UseFormValidation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { themeMode } = UseThemMode();
  return (
    <Container maxWidth="sm" className={classes.containerWrapper}>
      <ToastContainer />
      <Card raised>
        <Container maxWidth="md">
          <Grid container>
            <Grid item={12}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE_RESET_PASSWORD,
                }}
                validationSchema={FORM_VALIDATION_SCHEMA_RESET_PASSWORD}
                onSubmit={(values) => {
                  console.log({ ...values });
                  dispatch(
                    resetPassword({
                      password: values.password,
                      uid,
                      token,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      {
                        toast.success(t("reset-success"), {
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
                      setTimeout(() => {
                        console.log("hello");
                        navigate("/login");
                      }, 1000);
                    })

                    .catch((error) => {
                      console.log(error);
                      Swal.fire({
                        title: t("error-reset"),
                        text: t("error-reset-text"),
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: t("ok"),
                      });
                    });
                }}
              >
                <Form className={classes.formWrapper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <AppbarHeader>{t("reset-password")}</AppbarHeader>
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <PasswordField
                        name="password"
                        label={t("new-password")}
                        autocomplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWrapper>{t("reset")}</ButtonWrapper>{" "}
                    </Grid>
                  </Grid>{" "}
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
}

export default ResetPassword;

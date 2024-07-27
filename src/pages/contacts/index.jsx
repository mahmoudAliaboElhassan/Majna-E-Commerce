import React from "react";
import { AppbarHeader } from "@styles/appbar";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import emailjs from 'emailjs-com';

import TextFieldWrapper from "@components/formui/textField";
import TextAreaWrapper from "@components/formui/textarea";
import ButtonWrapper from "@components/formui/SubmitButton";
import UseInitialValues from "@utils/use-initial-values";
import UseFormValidation from "@formValidation/use-form-validation";

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

function Contacts() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { INITIAL_FORM_STATE_CONTACT } = UseInitialValues();
  const { FORM_VALIDATION_SCHEMA_CONTACT } = UseFormValidation();

  const sendEmail = (formValues) => {
    const templateParams = {
      yourName: formValues.yourName,
      yourEmail: formValues.yourEmail,
      yourSubject: formValues.yourSubject,
      yourMessage: formValues.yourMessage,
    };

    emailjs.send(
      'service_xhei2bd', // replace with your EmailJS service ID
      'template_1vn3uld', // replace with your EmailJS template ID
      templateParams,
      'Rz-Lj66nsArl2vdf9' // replace with your EmailJS user ID
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
  };

  return (
    <div>
      <AppbarHeader>{t("contact-us")}</AppbarHeader>
      <Container maxWidth="md" className={classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Typography>Fancy working together or just want to say hi? Drop us a message below.</Typography>
            <Formik
              initialValues={INITIAL_FORM_STATE_CONTACT}
              validationSchema={FORM_VALIDATION_SCHEMA_CONTACT}
              onSubmit={(values, { resetForm }) => {
                sendEmail(values);
                // resetForm();
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      name="yourName"
                      label={t("your-name")}
                      autocomplete="off"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      name="yourEmail"
                      label={t("your-email")}
                      autocomplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWrapper
                      name="yourSubject"
                      label={t("subject")}
                      autocomplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaWrapper
                      name="yourMessage"
                      textarea={3}
                      label={t("message")}
                      autocomplete="off"
                      placeholder={t("message-txt")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonWrapper>{t("send-message")}</ButtonWrapper>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <div style={{ border: "1px solid #ccc", padding: "16px" }}>
              <h2>Contacts</h2>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Contacts;

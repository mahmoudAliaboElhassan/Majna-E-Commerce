import React from "react"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { Grid, Typography, Box } from "@mui/material"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import emailjs from "emailjs-com"
import { styled } from "@mui/material/styles"

import UseThemMode from "@hooks/use-theme"
import UseInitialValues from "@utils/use-initial-values"
import TextAreaWrapper from "@components/formui/textarea"
import ButtonWrapper from "@components/formui/SubmitButton"
import TextFieldWrapper from "@components/formui/textField"
import SelectComp from "@components/formui/Select"
import UseFormValidation from "@formValidation/use-form-validation"
import UseUserRole from "@hooks/use-user-role"

const FormContainer = styled(Box)(() => {
  const { themeMode } = UseThemMode()

  return {
    padding: "32px",
    borderRadius: "16px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
    boxShadow:
      themeMode === "dark"
        ? "0 8px 24px rgba(251, 191, 36, 0.15)"
        : "0 8px 24px rgba(245, 158, 11, 0.12)",
    transition: "all 0.3s ease",

    "&:hover": {
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.25)"
          : "rgba(245, 158, 11, 0.25)",
      boxShadow:
        themeMode === "dark"
          ? "0 12px 32px rgba(251, 191, 36, 0.2)"
          : "0 12px 32px rgba(245, 158, 11, 0.18)",
    },
  }
})

function ContactForm() {
  const { t } = useTranslation()
  const { INITIAL_FORM_STATE_CONTACT } = UseInitialValues()
  const { FORM_VALIDATION_SCHEMA_CONTACT } = UseFormValidation()
  const { themeMode } = UseThemMode()
  const { userRoles } = UseUserRole()

  const sendEmail = (formValues) => {
    const templateParams = {
      yourName: formValues.yourName,
      yourEmail: formValues.yourEmail,
      yourSubject: formValues.yourSubject,
      yourMessage: formValues.yourMessage,
      yourRole: formValues.userRole,
    }

    emailjs
      .send(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_APP_USER_ID
      )
      .then((response) => {
        toast.success(t("sent-success"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: themeMode,
        })
      })
      .catch((error) => {
        Swal.fire({
          title: t("error-sending-message"),
          icon: "error",
          confirmButtonText: t("ok"),
        })
      })
  }

  return (
    <FormContainer>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "24px",
          textAlign: "center",
          fontWeight: 600,
          color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
          fontSize: { xs: "18px", sm: "20px", md: "22px" },
        }}
      >
        {t("contact-message")}
      </Typography>

      <Formik
        initialValues={INITIAL_FORM_STATE_CONTACT}
        validationSchema={FORM_VALIDATION_SCHEMA_CONTACT}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          sendEmail(values)
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldWrapper
                  name="yourName"
                  label={t("your-name")}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldWrapper
                  name="yourEmail"
                  label={t("your-email")}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWrapper
                  name="yourSubject"
                  label={t("subject")}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <SelectComp
                  name="userRole"
                  label={t("role")}
                  options={userRoles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextAreaWrapper
                  name="yourMessage"
                  textarea={3}
                  label={t("message")}
                  autoComplete="off"
                  placeholder={t("message-txt")}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonWrapper disabledBtn={isSubmitting}>
                  {t("send-message")}
                </ButtonWrapper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default ContactForm

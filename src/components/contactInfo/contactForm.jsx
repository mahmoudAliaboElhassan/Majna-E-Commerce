import React from "react";

import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import UseUserRole from "@hooks/use-user-role";
import UseInitialValues from "@utils/use-initial-values";
import TextAreaWrapper from "@components/formui/textarea";
import ButtonWrapper from "@components/formui/SubmitButton";
import TextFieldWrapper from "@components/formui/textField";
import SelectComp from "@components/formui/Select";
import UseFormValidation from "@formValidation/use-form-validation";

const useStyles = makeStyles((theme) => ({
    gridItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function ContactForm() {
    const { t } = useTranslation();
    const classes = useStyles();
    const { INITIAL_FORM_STATE_CONTACT } = UseInitialValues();
    const { FORM_VALIDATION_SCHEMA_CONTACT } = UseFormValidation();
    const { themeMode } = UseThemMode();
    const { userRoles } = UseUserRole();

    const sendEmail = (formValues) => {
        const templateParams = {
            yourName: formValues.yourName,
            yourEmail: formValues.yourEmail,
            yourSubject: formValues.yourSubject,
            yourMessage: formValues.yourMessage,
            yourRole: formValues.userRole,
        };

        

        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_USER_ID
        ).then((response) => {
            console.log('Email sent successfully:', response);
            toast.success(t("sent-success"), {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: themeMode,
            });
        }).catch((error) => {
            console.error('Error sending email:', error);
            Swal.fire({
                title: t("error-sending-message"),
                icon: "error",
                confirmButtonText: t("ok"),
            });
        });
    };

    return (
        <>
            <Typography style={{ marginBottom: "8px", textAlign: 'center', opacity: "0.8" }} variant="h5">{t('contact-message')}</Typography>
            <Formik
                initialValues={INITIAL_FORM_STATE_CONTACT}
                validationSchema={FORM_VALIDATION_SCHEMA_CONTACT}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    sendEmail(values);
                    setSubmitting(false); // Reset the submitting state after sending
                    // resetForm();
                }}
            >
                {({ isSubmitting }) => (
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
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextFieldWrapper
                                    name="yourSubject"
                                    label={t("subject")}
                                    autocomplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <SelectComp
                                    name="userRole"
                                    label={t("role")}
                                    options={userRoles}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <TextAreaWrapper
                                    name="yourMessage"
                                    textarea={3}
                                    label={t("message")}
                                    autocomplete="off"
                                    placeholder={t("message-txt")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonWrapper
                                    disabledBtn={isSubmitting}
                                >
                                    {t("send-message")}
                                </ButtonWrapper>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ContactForm;

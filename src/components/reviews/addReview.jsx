import React from 'react'

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import TextFieldWrapper from "@components/formui/textField";
import ButtonWrapper from "@components/formui/SubmitButton";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";
import SelectComp from '@components/formui/Select';
import UseRating from '@hooks/use-rating';
import { addReview } from "@state/slices/reviews"
import ProductRating from '@components/reviews/productRating';


const useStyles = makeStyles((theme) => ({
    formWrapper: {
        color:
            theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
        backgroundColor: "transparent !important",
    },
}))
function AddReview() {
    const { INITIAL_FORM_STATE_ADD_REVIEW } = UseInitialValues()
    const { FORM_VALIDATION_SCHEMA_ADD_REVIEW } = UseFormValidation()
    const { themeMode } = UseThemMode()
    const { productId } = useParams()
    const dispatch = useDispatch()
    const classes = useStyles();
    const { t } = useTranslation()
    const { rating } = UseRating()
    const { role } = useSelector((state) => state.auth)

    return (
        <Formik
            initialValues={{
                ...INITIAL_FORM_STATE_ADD_REVIEW,
            }}
            validationSchema={FORM_VALIDATION_SCHEMA_ADD_REVIEW}
            onSubmit={(values, { resetForm }) => {
                resetForm()
                dispatch(addReview(
                    { productId, rating: values.rating, content: values.content }))
                    .unwrap().then(() => {
                        {
                            toast.success(t("review-added"), {
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
                    }).catch((error) => {
                        if (error.response.status === 409) {
                            Swal.fire({
                                title: t("error-adding-review"),
                                text: t("review-exists"),
                                icon: "error",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: t("ok"),

                            });
                        } else if (error.response.status === 401 || (error.response.status === 403 && role !== "Customer")) {
                            console.log("Error:", error.message);
                            Swal.fire({
                                title: t("error-adding-review"),
                                text: t("error-not-authorized-review"),
                                icon: "error",
                                confirmButtonText: t("ok"),
                            });
                        } else if (error.response.status === 403 && role === "Customer") {
                            console.log("Error:", error.message);
                            Swal.fire({
                                title: t("error-adding-review"),
                                text: t("product-not-deliverd"),
                                icon: "error",
                                confirmButtonText: t("ok"),
                            });
                        }
                    });
            }}
        >
            <Form className={classes.formWrapper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            <motion.div
                                initial={{ opacity: 0, y: -25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                            >
                                <AppbarHeader>{t("add-review")}</AppbarHeader>
                            </motion.div>
                        </Typography>
                    </Grid>{" "}
                    <Grid item xs={12}>
                        <TextFieldWrapper
                            name="content"
                            label={t("content")}
                            autocomplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <SelectComp
                            name="rating"
                            label={t("rating")}
                            options={rating}
                        /> */}
                        <ProductRating name="rating" />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWrapper>{t("add-review")}</ButtonWrapper>{" "}
                    </Grid>


                </Grid>{" "}
            </Form>
        </Formik >
    )
}

export default AddReview
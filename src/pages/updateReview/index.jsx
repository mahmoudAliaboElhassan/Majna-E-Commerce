import React, { useEffect } from 'react'

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
import LoadingFetching from '@components/loadingFetching';
import SelectComp from '@components/formui/Select';
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";
import UseRating from '@hooks/use-rating';
import { getSpecifiedReview, updateSpecifiedReview } from '@state/slices/reviews';

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

function UpdateReview() {

    const dispatch = useDispatch()
    const { productId, reviewId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getSpecifiedReview({ productId, reviewId }))
    }, [])

    const { reviewRating, reviewContent, loadingGetReview } = useSelector((state) => state.review)


    const { INITIAL_FORM_STATE_EDIT_REVIEW } = UseInitialValues({ reviewRating, reviewContent })
    const { FORM_VALIDATION_SCHEMA_EDIT_REVIEW } = UseFormValidation()
    const { themeMode } = UseThemMode()
    const classes = useStyles();
    const { t } = useTranslation()
    const { rating } = UseRating()
    const { role } = useSelector((state) => state.auth)

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            {loadingGetReview ? <LoadingFetching>{t("wait-review")}</LoadingFetching>
                :
                (<Container maxWidth="sm" className={classes.containerWrapper}>
                    {/* <ToastContainer /> */}
                    <Card raised>
                        <Container maxWidth="md">
                            <Grid container>
                                <Grid item={12}>
                                    <Formik
                                        initialValues={{
                                            ...INITIAL_FORM_STATE_EDIT_REVIEW,
                                        }}
                                        validationSchema={FORM_VALIDATION_SCHEMA_EDIT_REVIEW}
                                        onSubmit={(values, { resetForm }) => {
                                            resetForm()
                                            dispatch(updateSpecifiedReview(
                                                { productId, reviewId, rating: values.ratingEdit, content: values.contentEdit }))
                                                .unwrap().then(() => {
                                                    {
                                                        toast.success(t("review-updated"), {
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
                                                    navigate(`/product-view/${productId}`)
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
                                                            <AppbarHeader>{t("update-review")}</AppbarHeader>
                                                        </motion.div>
                                                    </Typography>
                                                </Grid>{" "}
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="contentEdit"
                                                        label={t("content")}
                                                        autocomplete="off"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <SelectComp
                                                        name="ratingEdit"
                                                        label={t("rating")}
                                                        options={rating}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <ButtonWrapper>{t("update-review")}</ButtonWrapper>{" "}
                                                </Grid>


                                            </Grid>{" "}
                                        </Form>
                                    </Formik >
                                </Grid>
                            </Grid>
                        </Container>
                    </Card>
                </Container>)}
        </div>
    )
}

export default UpdateReview
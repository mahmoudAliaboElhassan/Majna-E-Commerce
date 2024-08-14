import React, { useEffect } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UseThemMode from "@hooks/use-theme";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import TextFieldWrapper from "@components/formui/textField";
import {
    addAddress,
} from "@state/slices/customer";
import {
    fetchGovernance,
    cleanUpGovernance,
} from "@state/slices/distributor";
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";
const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        color:
            theme.palette.type === "dark" ? theme.palette.common.white : "inherit", backgroundColor: "transparent !important",

    },
    containerWrapper: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
    },
}));

function AddAddress() {
    const { INITIAL_FORM_STATE_ADD_ADDRESS } = UseInitialValues();
    const { FORM_VALIDATION_SCHEMA_ADD_ADDRESS } = UseFormValidation()
    const { t } = useTranslation();
    const { loadingGovernaces, governance } = useSelector(
        (state) => state.distributor
    );
    const { Uid } = useSelector((state) => state.auth);
    const { themeMode } = UseThemMode()
    const dispatch = useDispatch();
    const classes = useStyles()
    useEffect(() => {
        if (governance.length === 0) {
            dispatch(fetchGovernance());
        }
        // return () => {
        //     dispatch(cleanUpGovernance());
        // };
    }, [dispatch]);
    let allCities = [];

    governance?.forEach((obj) => {
        allCities = allCities.concat(obj.cities);
    });

    // Now allCities array contains all cities
    console.log(allCities);
    return (
        <div style={{ position: "relative", height: "100vh" }}>
            {!loadingGovernaces && governance.length ? (
                <Container maxWidth="sm" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    {/* <ToastContainer /> */}
                    <Card raised>
                        <Container maxWidth="md">
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item={12}>
                                    <Formik
                                        initialValues={{
                                            ...INITIAL_FORM_STATE_ADD_ADDRESS,
                                        }}
                                        validationSchema={FORM_VALIDATION_SCHEMA_ADD_ADDRESS}
                                        onSubmit={(values) => {
                                            console.log({ ...values });
                                            dispatch(
                                                addAddress({
                                                    customerId: Uid,
                                                    city_id: values.city,
                                                    address: values.address,
                                                })
                                            )
                                                .unwrap()
                                                .then(() => {
                                                    {
                                                        toast.success(t("address-added"), {
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
                                                    if (error.response.status === 409) {
                                                        Swal.fire({
                                                            title: t("confilct"),
                                                            text: t("error-wait-text"),
                                                            icon: "error",
                                                            confirmButtonColor: "#3085d6",
                                                            confirmButtonText: t("ok"),
                                                        });
                                                    } else if (error.response.status === 401) {
                                                        Swal.fire({
                                                            title: t("unauthorize"),
                                                            text: t("unauthorized-txt"),
                                                            icon: "error",
                                                            confirmButtonColor: "#3085d6",
                                                            confirmButtonText: t("ok"),
                                                        });
                                                    } else if (error.response.status === 403) {
                                                        Swal.fire({
                                                            title: t("forbidden"),
                                                            text: t("forbidden-txt-buyer"),
                                                            icon: "error",
                                                            confirmButtonColor: "#3085d6",
                                                            confirmButtonText: t("ok"),
                                                        });
                                                    }
                                                    console.log(error);
                                                });
                                        }}
                                    >
                                        <Form className={classes.formWrapper}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <AppbarHeader data-aos="fade-up">{t("add-address-now")}</AppbarHeader>
                                                </Grid>{" "}
                                                <Grid item xs={12}>
                                                    <SelectComp
                                                        name="city"
                                                        label={t("city")}
                                                        options={allCities}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {" "}
                                                    <TextFieldWrapper
                                                        name={"address"}
                                                        label={t("full-address")}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <ButtonWrapper>{t("add-address")}</ButtonWrapper>{" "}
                                                </Grid>
                                            </Grid>{" "}
                                        </Form>
                                    </Formik>
                                </Grid>
                            </Grid>
                        </Container>
                    </Card>
                </Container>
            ) : (
                <LoadingFetching>{t("loading-governance")}</LoadingFetching>
            )}
        </div>
    )
}

export default AddAddress

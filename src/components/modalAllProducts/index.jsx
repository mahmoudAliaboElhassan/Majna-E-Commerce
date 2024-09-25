import React, { useEffect } from 'react';
import { Modal, IconButton, Card, Container, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik, Form } from 'formik'; // Import Formik
import UseThemMode from '@hooks/use-theme';
import UseDirection from '@hooks/use-direction';
import { AppbarHeader } from '@styles/appbar';
import LoadingFetching from '@components/loadingFetching';
import SelectAddress from '@components/formui/selectAddress';
import { getAllAddresses, cleanUpGetAllAddresses, addOrder } from '@state/slices/customer';
import UseFormValidation from '@formValidation/use-form-validation';
import { deleteCarts } from '@state/slices/cart'

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        color: theme.palette.type === 'dark' ? theme.palette.common.white : 'inherit',
        backgroundColor: 'transparent !important',
        width: "100%"
    },
    containerWrapper: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

function ModalOrderAll({ openModalOrder, close, allProducts, totalPrice }) {
    const { t } = useTranslation();
    const { Uid, role } = useSelector((state) => state.auth);
    const { themeMode } = UseThemMode();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const classes = useStyles();
    const { Direction } = UseDirection();
    const { FORM_VALIDATION_SCHEMA_ADD_ORDER } = UseFormValidation();
    const { addresses, loadingGetAddresses } = useSelector((state) => state.customer);

    useEffect(() => {
        if (Uid && role === 'Customer') {
            dispatch(getAllAddresses({ customerId: Uid }));
        }
        return () => {
            dispatch(cleanUpGetAllAddresses());
        };
    }, [Uid, role, dispatch]);

    const handleOrderSubmit = (values) => {
        close()
        const orderData = {
            pickup_address_id: values.pickup_address_id, // Accessing selected pickup address
            order_items: allProducts,
        };

        dispatch(addOrder(orderData))
            .unwrap()
            .then(() => {
                toast.success(t("order-success"), {
                    position: "top-right",
                    autoClose: 1000,
                    theme: themeMode,
                });

                dispatch(deleteCarts({ customerId: Uid }))
                close(); // Close the modal on success
                navigate(`/payment?price=${totalPrice}`)
            })
            .catch((error) => {
                console.log(error.response.data)
                const errorMessage = error.response.data
                const key = Object.keys(errorMessage)
                console.log("error keys", error.response.data["103"])
                const words = errorMessage[key].message;
                const index = words.indexOf("#");


                const orderId = words.slice(index + 1);  // Extracts everything after the #


                Swal.fire({
                    title: `${t('order-id-error')} ${orderId}`,
                    text: `${t('exists-in-store')} ${errorMessage[key].available_inventory}`,
                    icon: "error",
                    confirmButtonText: t("ok"),
                });
            });
    };

    return (
        <Modal
            open={openModalOrder}
            onClose={close}
            aria-labelledby="modal-for-add-order"
            aria-describedby="modal-description"
        >
            {loadingGetAddresses ? (
                <LoadingFetching>{t('wait-addresses')}</LoadingFetching>
            ) : (
                <Container maxWidth="sm" className={classes.containerWrapper}>
                    {role === "Customer" ? (
                        addresses?.length ? (
                            <>
                                <IconButton
                                    onClick={close}
                                    sx={{ position: 'absolute', top: '5px', [Direction.left]: '25px' }}
                                >
                                    <CloseIcon sx={{ fontSize: '3rem' }} color="secondary" />
                                </IconButton>
                                <Card raised>
                                    <Container maxWidth="md">
                                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                                            <Grid item xs={12}>
                                                <AppbarHeader data-aos="fade-up">
                                                    {t('add-order-now')}
                                                </AppbarHeader>
                                            </Grid>
                                            {/* Formik Form Starts Here */}
                                            <Formik
                                                initialValues={{ pickup_address_id: '' }}
                                                onSubmit={handleOrderSubmit}
                                                validationSchema={FORM_VALIDATION_SCHEMA_ADD_ORDER}
                                            >
                                                {({ values }) => (
                                                    <Form className={classes.formWrapper}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <SelectAddress
                                                                    name="pickup_address_id"
                                                                    label={t('address')}
                                                                    options={addresses}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    type="submit" // Submit button for the form
                                                                    variant={themeMode === "dark" ? "contained" : "outlined"}
                                                                    fullWidth
                                                                >
                                                                    {t('add-order')}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                )}
                                            </Formik>
                                            {/* Formik Form Ends Here */}
                                        </Grid>
                                    </Container>
                                </Card>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    onClick={close}
                                    sx={{ position: 'absolute', top: '5px', [Direction.left]: '40px' }}
                                >
                                    <CloseIcon sx={{ fontSize: '3rem' }} color="secondary" />
                                </IconButton>
                                <Container maxWidth="md">
                                    <Card sx={{
                                        minWidth: "80%",
                                        minHeight: "80vh",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}>
                                        <Typography style={{ fontSize: '18px' }}>
                                            {t('no-addresses')}
                                        </Typography>
                                        <Button
                                            onClick={close}
                                            variant={themeMode === "dark" ? "contained" : "outlined"}
                                            sx={{ fontSize: "19px" }}
                                            component={Link}
                                            to="/customer-control-panel/add-address"
                                        >
                                            {t('add-address')}
                                        </Button>
                                    </Card>
                                </Container>
                            </>
                        )
                    ) : (
                        <>
                            <IconButton
                                onClick={close}
                                sx={{ position: 'absolute', top: '5px', [Direction.left]: '40px' }}
                            >
                                <CloseIcon sx={{ fontSize: '3rem' }} color="secondary" />
                            </IconButton>
                            <Container maxWidth="md">
                                <Card sx={{
                                    minWidth: "80%",
                                    minHeight: "80vh",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}>
                                    <Typography style={{ fontSize: '18px' }}>
                                        {t('login-now-add-address')}
                                    </Typography>
                                    <Button
                                        onClick={close}
                                        variant={themeMode === "dark" ? "contained" : "outlined"}
                                        sx={{ fontSize: "19px" }}
                                        component={Link}
                                        to="/login"
                                    >
                                        {t('login-now')}
                                    </Button>
                                </Card>
                            </Container>
                        </>
                    )}
                </Container>
            )}
        </Modal>
    );
}

export default ModalOrderAll;

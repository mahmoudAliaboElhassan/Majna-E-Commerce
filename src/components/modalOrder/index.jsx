import React, { useEffect, useState } from 'react';

import { Modal, IconButton, Card, Container, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UseThemMode from '@hooks/use-theme';
import UseDirection from '@hooks/use-direction';
import ButtonWrapper from '@components/formui/SubmitButton';
import { AppbarHeader } from '@styles/appbar';
import UseFormValidation from '@formValidation/use-form-validation';
import UseInitialValues from '@utils/use-initial-values';
import SelectComp from '@components/formui/Select';
import TextFieldWrapper from '@components/formui/textField';
import withGuard from '@utils/withGuard';
import LoadingFetching from '@components/loadingFetching';
import SelectAddress from '@components/formui/selectAddress';
import { getAllAddresses, cleanUpGetAllAddresses, addOrder } from '@state/slices/customer';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        color: theme.palette.type === 'dark' ? theme.palette.common.white : 'inherit',
        backgroundColor: 'transparent !important',
    },
    containerWrapper: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

function ModalOrder({ openModalOrder, close, productId, maxNumber, price }) {
    const { FORM_VALIDATION_SCHEMA_ADD_ORDER } = UseFormValidation();
    const { t } = useTranslation();
    const { Uid, role } = useSelector((state) => state.auth);
    const { themeMode } = UseThemMode();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const classes = useStyles();
    const { Direction } = UseDirection();
    const { addresses, loadingGetAddresses } = useSelector((state) => state.customer);

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        dispatch(getAllAddresses({ customerId: Uid }));
        return () => {
            dispatch(cleanUpGetAllAddresses());
        };
    }, [Uid, dispatch]);

    const handleNextStep = (validateForm, errors) => {
        console.log(errors)
        console.log(validateForm)
        console.log(validateForm())
        validateForm().then((errors) => {
            console.log(errors)
            if (currentStep === 0 && !errors.address) {
                setCurrentStep((prevStep) => prevStep + 1);
            }
        });
    };

    const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

    return (
        <div data-aos="fade-up">
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
                        {role === "Customer" ? addresses?.length ? (
                            <>
                                <IconButton
                                    onClick={close}
                                    sx={{ position: 'absolute', top: '5px', [Direction.left]: '25px' }}
                                >
                                    <CloseIcon sx={{ fontSize: '3rem' }} color="secondary" />
                                </IconButton>
                                <Card raised>
                                    <Container maxWidth="md">
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item xs={12}>
                                                <Formik
                                                    initialValues={{
                                                        pickup_address_id: null,
                                                        order_items: [{
                                                            product_id: productId,
                                                            quantity: 1,
                                                        }],
                                                    }}
                                                    validationSchema={FORM_VALIDATION_SCHEMA_ADD_ORDER}
                                                    onSubmit={(values) => {
                                                        setCurrentStep(0)
                                                        close()
                                                        console.log({ ...values });
                                                        // Handle form submission logic here
                                                        dispatch(addOrder(values)).unwrap()
                                                            .then(() => {
                                                                toast.success(t("order-success"), {
                                                                    position: "top-right",
                                                                    autoClose: 1000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                    theme: themeMode,
                                                                });

                                                                navigate(`/payments/${values.order_items[0].quantity * parseInt(price)}`)
                                                            })
                                                            .catch((error) => {
                                                                const errorMessages = {
                                                                    401: t("error-not-authorized-text-order"),
                                                                    403: t("error-not-customer-text-order"),
                                                                    400: `${(t('error-exceed-number'))} ${maxNumber}`
                                                                };
                                                                const errorMessage =
                                                                    errorMessages[error.response.status] || error.message;
                                                                Swal.fire({
                                                                    title: t("error-adding-order"),
                                                                    text: errorMessage,
                                                                    icon: "error",
                                                                    confirmButtonText: t("ok"),
                                                                });
                                                            });
                                                    }}
                                                >
                                                    {({ validateForm, errors }) => (
                                                        <Form className={classes.formWrapper}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12}>
                                                                    <AppbarHeader data-aos="fade-up">
                                                                        {t('add-order-now')}
                                                                    </AppbarHeader>
                                                                </Grid>

                                                                {currentStep === 0 && (
                                                                    <>
                                                                        <Grid item xs={12}>
                                                                            <SelectAddress
                                                                                name="pickup_address_id"
                                                                                label={t('address')}
                                                                                options={addresses}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Button variant={themeMode === "dark" ? "contained" : "outlined"}
                                                                                type="submit" onClick={() => handleNextStep(validateForm, errors)}
                                                                                fullWidth>
                                                                                {t('next')}
                                                                            </Button>
                                                                        </Grid>
                                                                    </>
                                                                )}

                                                                {currentStep === 1 && (
                                                                    <>
                                                                        <Grid item xs={12}>
                                                                            <TextFieldWrapper
                                                                                name="order_items.0.quantity"
                                                                                label={t('quantity')}
                                                                                type="number"
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Button variant={themeMode === "dark" ? "contained" : "outlined"}
                                                                                onClick={handlePreviousStep}>
                                                                                {t('back')}
                                                                            </Button>
                                                                            <ButtonWrapper>
                                                                                {t('add-order')}
                                                                            </ButtonWrapper>
                                                                        </Grid>
                                                                    </>
                                                                )}
                                                            </Grid>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Card>
                            </>
                        )
                            : (
                                <>
                                    <IconButton
                                        onClick={close}
                                        sx={{ position: 'absolute', top: "5px", [Direction.left]: '40px' }}
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
                                            <Button onClick={close} variant={themeMode === "dark" ? "contained" : "outlined"} sx={{ fontSize: "19px" }} component={Link} to="/customer-control-panel/add-address" >{t('add-address')}</Button>
                                        </Card>
                                    </Container>
                                </>
                            ) : <>
                            <IconButton
                                onClick={close}
                                sx={{ position: 'absolute', top: "5px", [Direction.left]: '40px' }}
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

                                    <Button onClick={close} variant={themeMode === "dark" ? "contained" : "outlined"} sx={{ fontSize: "19px" }} component={Link} to="/login" >{t('login-now-add-address')}</Button>
                                </Card>
                            </Container>
                        </>}
                    </Container>
                )}
            </Modal>
        </div>
    );
}

export default ModalOrder;

import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Box, Grid, Typography, Card, CardContent, CardMedia, Divider, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import UseThemeMode from '@hooks/use-theme';
import { AppbarHeader } from "@styles/appbar";
import UseMediaQueryHook from "@hooks/use-media-query";
import { getSpecificOrder, updateSpecificOrder } from '@state/act/actDelivery';
import UseDirection from "@hooks/use-direction";


function SpecificOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { themeMode } = UseThemeMode();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isMatch } = UseMediaQueryHook();
    const { Direction } = UseDirection()
    useEffect(() => {
        dispatch(getSpecificOrder({ orderId }));
    }, [dispatch, orderId]);

    const { specificOrderData, loadingUpdateOrderStatus } = useSelector((state) => state.delivery);
    const orderItems = specificOrderData?.order_items;
    const statusChangedTo = specificOrderData?.status === 'Placed' ? 'Shipped' : 'Delivered';

    const handleStatus = () => {
        dispatch(updateSpecificOrder({ orderId, status: statusChangedTo }))
            .unwrap()
            .then(() => {
                toast.success(t(`updated-${statusChangedTo}`), {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: themeMode,
                });
                navigate('/delivery-control-panel');
            });
    };
    return (
        <Container
            // style={{ textAlign: isMatch ? "center" : "inherit" }}
            style={{ textAlign: "center" }}
        >
            <Box my={4}>
                <Card sx={{ p: 4, mb: 2 }}>
                    <AppbarHeader data-aos="fade-up">  {t('order-details')}</AppbarHeader>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>{t('order-summary')}</Typography>
                                <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("total-price-order")} </span>
                                    {specificOrderData?.total_price}
                                </Typography>

                                <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("city")} </span>
                                    {specificOrderData?.pickup_address?.city}
                                </Typography>
                                <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("full-order-address")} </span>
                                    {specificOrderData?.pickup_address?.address}
                                </Typography>

                                <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("governorate")} </span>
                                    {specificOrderData?.pickup_address?.governorate}
                                </Typography>
                                <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("order-status")} </span>
                                    {specificOrderData?.status}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} >
                            {orderItems?.map(({ quantity, unit_price, product, stores }, index) => (
                                <Card sx={{ p: 4, mb: 2 }}
                                    key={index} >
                                    <Typography variant="h5" sx={{ mb: 2 }} >
                                        {t('product-details')}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <CardMedia
                                                component="img"
                                                image={product?.cover_image}
                                                alt={product?.name}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CardContent>



                                            <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("product-name")} </span>
                                    {product?.name}
           </Typography>

                                            <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("product-brand")} </span>
                                    {product?.brand}
           </Typography>
                                            <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("product-quantity")} </span>
                                    {quantity}
           </Typography>
                                            <Typography variant="h6" component="p" gutterBottom
                                    // sx={{ fontSize: { xs: "20px", sm: "13px", md: "14px", lg: "20px" } }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <span style={{ fontWeight: "500", [Direction.marginRight]: "8px" }}>{t("product-price")} </span>
                                    {unit_price}
           </Typography>





                                                 <Typography variant="h5" sx={{ mb: 2 }}>
                                                    {stores.length > 1 ? t('stores-details') : t('store-details')}
                                                </Typography>


                                                {stores?.map(({ store }, storeIndex) => (
                                                    <Box key={storeIndex} mt={2}>
                                                        <Typography variant="body2">Store Name: {store?.name}</Typography>
                                                        <Typography variant="body2">City: {store?.city}</Typography>
                                                        <Typography variant="body2">Governorate: {store?.governorate}</Typography>
                                                        <Typography variant="body2">Address: {store?.address}</Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                    </Box>
                                                ))}
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Card>

                <Button
                    variant={themeMode === 'dark' ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    disabled={loadingUpdateOrderStatus}
                    onClick={handleStatus}
                    style={{ margin: "auto" }}
                >
                    {t(`change-${statusChangedTo}`)}
                </Button>
            </Box>
        </Container >
    );
}

export default SpecificOrder;

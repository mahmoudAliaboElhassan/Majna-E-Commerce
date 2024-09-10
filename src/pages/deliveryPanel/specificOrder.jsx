import React, { useEffect } from 'react'

import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Box } from '@mui/material';

import UseThemeMode from "@hooks/use-theme";
import { getSpecificOrder } from '@state/act/actDelivery';
import { updateSpecificOrder } from '@state/act/actDelivery';
import { useTranslation } from 'react-i18next';


function SpecificOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams()
    const { themeMode } = UseThemeMode()
    const { t } = useTranslation()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getSpecificOrder({ orderId: orderId }))
    }, [])
    const { specificOrderData, loadingUpdateOrderStatus } = useSelector((state) => state.delivery)
    const orderItems = specificOrderData?.order_items;
    const statusChangedTo = specificOrderData?.status === "Placed" ? "Shipped" : "Delivered"
    const handleStatus = () => {
        dispatch(updateSpecificOrder(
            { orderId: orderId, status: statusChangedTo }))
            .unwrap().then(() => {
                toast.success(t(`updated-${statusChangedTo}`), {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: themeMode,
                });
                navigate("/delivery-control-panel")
            })
    }
    return (
        <Box >
            <Container>
                <div>total price {specificOrderData?.total_price}</div>
                {/* <div>ordered at {new Date(specificOrderData.ordered_at)}</div> */}
                <div>city {specificOrderData?.pickup_address?.city}</div>
                <div>address {specificOrderData?.pickup_address?.address}</div>
                <div>governorate {specificOrderData?.pickup_address?.governorate}</div>
                <div>status is {specificOrderData?.status}</div>
                {orderItems?.map(({ quantity, unit_price, product, stores }) => (
                    <>
                        <div>name {product?.name}</div>
                        <div>brand {product?.brand}</div>
                        <div>quantity {quantity}</div>
                        <div>unit price {unit_price}</div>
                        <img src={product?.cover_image} alt="" style={{ witdh: "50px", height: "50px" }} />
                        {stores?.map(({ store }) => (
                            <>
                                <div>store name is {store?.name}</div>
                                <div>store city is {store?.city}</div>
                                <div>store governorate is {store?.governorate}</div>
                                <div>store address is {store?.address}</div>
                            </>
                        ))}
                    </>
                ))}
                <Button variant={themeMode === "dark" ? "contained" : "outlined"} disabled={loadingUpdateOrderStatus}
                    onClick={handleStatus}>{t(`change-${statusChangedTo}`)}</Button>
            </Container>
        </Box >
    )
}

export default SpecificOrder

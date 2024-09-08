import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getSpecificOrder } from '@state/act/actDelivery';
import { useParams } from 'react-router-dom';
import { updateSpecificOrder } from '@state/act/actDelivery';

function SpecificOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams()
    useEffect(() => {
        dispatch(getSpecificOrder({ orderId: orderId }))
    }, [])
    const { specificOrderData } = useSelector((state) => state.delivery)
    const orderItems = specificOrderData?.order_items;
    const handleStatus = () => {
        dispatch(updateSpecificOrder({ orderId: orderId, status: specificOrderData.status === "Placed" ? "Shipped" : "Delivered" }))
    }
    return (
        <div>
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
            <button onClick={handleStatus}>change order status to {specificOrderData?.status === "Placed" ? "Shipped" : "Delivered"}</button>
        </div>
    )
}

export default SpecificOrder

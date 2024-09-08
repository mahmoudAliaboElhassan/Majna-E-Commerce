import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { getSpecificOrder } from '@state/act/actDelivery';
import { useParams } from 'react-router-dom';
import { updateSpecificOrder } from '@state/act/actDelivery';

function SpecificOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams()
    useEffect(() => {
        dispatch(getSpecificOrder({ orderId: orderId }))
    })
    return (
        <div>
            SpecificOrder
            <button onClick={() => dispatch(updateSpecificOrder({
                orderId: orderId,
                status: "shipped"
            }))}>change</button>
        </div>
    )
}

export default SpecificOrder

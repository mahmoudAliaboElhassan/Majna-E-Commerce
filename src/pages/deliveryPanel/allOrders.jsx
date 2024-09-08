import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDeliveryOrders } from '@state/slices/delivery'

function AllDeliveryOrders() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDeliveryOrders({ ordering: "ordered_at" }))
    })
    return (
        <div>
            AllDeliveryOrders
            <Link to={`/delivery-control-panel/order/15`}>specific order</Link>
        </div>
    )
}

export default AllDeliveryOrders

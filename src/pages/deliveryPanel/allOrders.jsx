// import React, { useEffect } from 'react'

// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { getDeliveryOrders } from '@state/slices/delivery'

// function AllDeliveryOrders() {
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(getDeliveryOrders({ ordering: "ordered_at" }))
//     })
//     return (
//         <div>
//             AllDeliveryOrders
//             <Link to={`/delivery-control-panel/order/15`}>specific order</Link>
//         </div>
//     )
// }

// export default AllDeliveryOrders
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppbarHeader } from "@styles/appbar";
import { getAllAddresses } from '@state/slices/customer';
import { getDeliveryOrders } from '@state/slices/delivery';
import SelectStatus from "@components/selectStatus"
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid";
import UseOrderOptions from '@hooks/use-order-date';
import UseStatusOptions from '@hooks/use-status-options';
import { NoCount, NoCountContainer } from "@styles/products";
import UseThemeMode from "@hooks/use-theme";


function AllDeliveryOrders() {
    const dispatch = useDispatch();
    const { addresses, loadingGetAddresses } = useSelector((state) => state.customer);
    const { loadingOrdersDelivery, ordersDelivery } = useSelector((state) => state.delivery);
    const { Uid } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    const { statusDeliveryOptions } = UseStatusOptions()
    const { orderOptions } = UseOrderOptions()
    const [status, setStaus] = useState("Placed")
    const [ordering, setOrderding] = useState("")
    const handleChangeStatus = (e) => {
        setStaus(e.target.value)
    }
    const handleChangeOrdering = (e) => {
        setOrderding(e.target.value)
    }
    const { themeMode } = UseThemeMode()

    useEffect(() => {
        dispatch(getDeliveryOrders({ status, ordering }));
        dispatch(getAllAddresses({ customerId: Uid }));
    }, [dispatch, status, ordering]);

    // Define columns for the DataGrid
    const columns = [
        {
            field: 'id', headerName: t('id'), width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'pickup_address_id', headerName: t('order-address'), width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'status', headerName: t('order-status'), width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ordered_at', headerName: t('ordered-at'),
            minWidth: 500,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "view", headerName: t("view-product"),
            headerAlign: "center", align: "center",
            width: 200,
            renderCell: (params) =>
            (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    color="success"
                    component={Link}
                    to={`/delivery-control-panel/order/${params.row.id}`}
                >
                    {t("view")}
                </Button>
            ),
        },
    ];

    // Prepare rows for the DataGrid
    const rows = ordersDelivery?.map(({ id, pickup_address_id, status, ordered_at, total_price, order_items }) => ({
        id,
        status,
        total_price,
        ordered_at: new Date(ordered_at),
        quantity: order_items?.[0]?.quantity,
        unit_price: order_items?.[0]?.unit_price,
        image: order_items?.[0]?.product?.cover_image,
        pickup_address_id: addresses?.find((address) => address.id === pickup_address_id)?.address,
    }));

    return (
        <>
            {loadingOrdersDelivery || loadingGetAddresses ? (
                <LoadingFetching>{t("wait-orders")}</LoadingFetching>
            ) : ordersDelivery?.length ? (
                <>
                    <AppbarHeader data-aos="fade-up">{t("orders")}</AppbarHeader>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                        <SelectStatus options={statusDeliveryOptions} status={status} handleChange={handleChangeStatus} label={t("select-status")} />
                        <SelectStatus options={orderOptions} status={ordering} handleChange={handleChangeOrdering} label={t("select-order-type")} />
                    </Box>
                    <DataGridContainer>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            rowHeight={120}
                        />
                    </DataGridContainer>
                </>
            ) : (
                <NoCountContainer>
                    <SelectStatus options={statusDeliveryOptions} status={status} handleChange={handleChangeStatus} label={t("select-status")} />
                    <NoCount>{t("no-orders")}</NoCount>
                </NoCountContainer>
            )}
        </>
    );
}

export default AllDeliveryOrders;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Box } from '@material-ui/core';

import { AppbarHeader } from "@styles/appbar";
import { getAllOrders, getAllAddresses } from '@state/slices/customer';
import SelectStatus from "@components/selectStatus"
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid";
import UseOrderOptions from '@hooks/use-order-date';
import UseStatusOptions from '@hooks/use-status-options';
import { NoCount, NoCountContainer } from "@styles/products";

function AllOrders() {
    const dispatch = useDispatch();
    const { loadingGetOrders, allOrders, addresses, loadingGetAddresses } = useSelector((state) => state.customer);
    const { Uid } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    const [status, setStaus] = useState("")
    const [ordering, setOrderding] = useState("")
    const handleChangeStatus = (e) => {
        setStaus(e.target.value)
    }
    const handleChangeOrdering = (e) => {
        setOrderding(e.target.value)
    }
    const { statusOptions } = UseStatusOptions()
    const { orderOptions } = UseOrderOptions()
    useEffect(() => {
        dispatch(getAllOrders({ customerId: Uid, status, ordering }));
        dispatch(getAllAddresses({ customerId: Uid }));
    }, [dispatch, Uid, status, ordering]);

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
            field: 'unit_price', headerName: t('unit-price'),
            width: 150, headerAlign: 'center',
            align: 'center', type: 'number'
        },
        {
            field: 'quantity', headerName: t('quantity'),
            width: 100, type: 'number',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'total_price', headerName: t('total-price-order'),
            width: 150, type: 'number',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'image',
            headerName: t('product-img'),
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Product"
                    style={{ width: '100%', height: 'auto' }}
                />
            ),
        },
        {
            field: 'ordered_at', headerName: t('ordered-at'),
            minWidth: 500,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    // Prepare rows for the DataGrid
    const rows = allOrders?.map(({ id, pickup_address_id, status, ordered_at, total_price, order_items }) => ({
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
            {loadingGetOrders || loadingGetAddresses ? (
                <LoadingFetching>{t("wait-orders")}</LoadingFetching>
            ) : allOrders?.length ? (
                <>
                    <AppbarHeader data-aos="fade-up">{t("your-orders")}</AppbarHeader>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItem: "center" }}>
                        <SelectStatus options={statusOptions} status={status} handleChange={handleChangeStatus} label={t("select-status")} />
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
                    <SelectStatus options={statusOptions} status={status} handleChange={handleChangeStatus} label={t("select-status")} />
                    <NoCount>{t("no-orders")}</NoCount>
                </NoCountContainer>
            )}
        </>
    );
}

export default AllOrders;
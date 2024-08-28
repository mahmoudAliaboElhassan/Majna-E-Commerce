import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

import { AppbarHeader } from "@styles/appbar";
import { getAllOrders } from '@state/slices/customer'
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid"
import { NoCount, NoCountContainer } from "@styles/products";

function AllOrders() {
    const dispatch = useDispatch()
    const { loadingGetOrders, allOrders } = useSelector((state) => state.customer)
    const { t } = useTranslation()
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return (
        <>
            {loadingGetOrders ? (
                <LoadingFetching>{t("wait-orders")}</LoadingFetching>
            ) : allOrders?.length ? (
                <>
                    <AppbarHeader data-aos="fade-up">{t("your-orders")}</AppbarHeader>
                    <DataGridContainer>
                        <DataGrid
                            // rows={rows}
                            // columns={columns}
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
                    <NoCount>{t("no-orders")}</NoCount>
                </NoCountContainer>
            )}
        </>
    )
}

export default AllOrders

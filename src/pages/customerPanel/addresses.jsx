import React, { useCallback, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import Swal from "sweetalert2";

import { DataGridContainer } from "@styles/dataGrid"
import LoadingFetching from "@components/loadingFetching";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";
import { getAllAddresses, deleteAddress, cleanUpGetAllAddresses } from "@state/slices/customer";
import "@pages/shoppingCart/style.css"

function Addresses() {
    const { t } = useTranslation();
    const { Uid } = useSelector((state) => state.auth);
    const { addresses, loadingGetAddresses, countOfAddresses } = useSelector((state) => state.customer);
    const dispatch = useDispatch();
    const { themeMode } = UseThemMode();

    useEffect(() => {
        dispatch(getAllAddresses({ customerId: Uid }));
        return () => {
            dispatch(cleanUpGetAllAddresses());
        };
    }, [Uid, countOfAddresses]);
    const handleDeleteAddress = useCallback(
        (addressId) => {
            Swal.fire({
                title: t("suring"),
                text: t("info-address"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: t("delete-confirm"),
                cancelButtonText: t("cancel-delete"),
                customClass: {
                    confirmButton: "red-confirm-button swal2-confirm",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteAddress({ customerId: Uid, addressId }));
                    Swal.fire({
                        title: t("deleting-address"),
                        icon: "success",
                        confirmButtonText: t("ok"),
                    });
                } else {
                    Swal.fire({
                        title: t("keeping-address"),
                        icon: "info",
                        confirmButtonText: t("ok"),
                    });
                }
            });
        },
        [dispatch, t, Uid]
    );
    const columns = [
        {
            field: "id",
            headerName: t("id"),
            width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "governorate",
            headerName: t("governorate"),
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "city",
            headerName: t("city"),
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "address",
            headerName: t("full-address"),
            headerAlign: 'center',
            align: 'center',
            width: 500
        },
        {
            field: "edit",
            headerName: t("edit"),
            headerAlign: 'center',
            align: 'center',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    fullWidth
                    component={Link}
                    to={`/customer-control-panel/edit-address/${params.row.id}`}
                    style={{ width: "60%" }}
                    color="info">
                    {params.value}
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: t("delete"),
            headerAlign: 'center',
            align: 'center',
            width: 150,

            renderCell: (params) => (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    fullWidth
                    style={{ width: "60%" }}
                    onClick={() => handleDeleteAddress(params.row.id)}
                    color="error">
                    {params.value}
                </Button>
            ),
        },
    ];

    // Transform allBrands data into rows for the DataGrid
    const rows = addresses?.map(({ id, governorate, city, address }) => ({
        id: id,
        governorate: governorate,
        city: city,
        address: address,
        edit: t("edit"),
        delete: t("delete")
    }));
    return (
        <>
            {loadingGetAddresses ? (
                <LoadingFetching>{t("wait-addresses")}</LoadingFetching>
            ) : addresses?.length ? (
                <>
                    <AppbarHeader data-aos="fade-up">{t("your-addresses")}</AppbarHeader>
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
                <Typography style={{ fontSize: "18px" }}>{t("no-addresses")}</Typography>
            )}
        </>
    );
}

export default Addresses;

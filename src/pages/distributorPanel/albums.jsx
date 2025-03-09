import React, { useEffect, useState, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";

import "@pages/shoppingCart/style.css"
import { DataGridContainer } from "@styles/dataGrid"
import LoadingFetching from "@components/loadingFetching";
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn";
import { getAlbumItems, deleteAlbum } from '@state/slices/album'
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";

function Albums() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { themeMode } = UseThemMode();
    const [btnDisabled, setbtnDisabled] = useState()
    const { t } = useTranslation()
    const { albumItems, loadingGetAlbumItems, countOfAlbumItems } = useSelector((state) => state.album)
    const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn();

    useEffect(() => {
        dispatch(getAlbumItems({ productId: productId }))
    }, [countOfAlbumItems])




    // const handleAddingAlbum = () => {
    //     dispatch(addAlbumItem())
    // }





    const handleDelete = useCallback(
        (albumId) => {
            setbtnDisabled(albumId)
            Swal.fire({
                title: t("suring"),
                text: t("info-album"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: t("delete-confirm"),
                cancelButtonText: t("cancel-delete"),
                customClass: {
                    confirmButton: "red-confirm-button swal2-confirm",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteAlbum({ albumId, productId })).unwrap().then(() => {
                        Swal.fire({
                            title: t("deleting-album"),
                            icon: "success",
                            confirmButtonText: t("ok"),
                        });
                    }).catch((error) => {
                        Swal.fire({
                            title: t("error-deleting-product"),
                            icon: "warning",
                            confirmButtonText: t("ok"),
                        });
                    })

                } else {
                    Swal.fire({
                        title: t("keeping-album"),
                        icon: "info",
                        confirmButtonText: t("ok"),
                    });
                }
            });
        },
        [dispatch, t]
    );













    const columns = [
        {
            field: "id",
            headerName: t("album-id"), width: 100,
            headerAlign: "center", align: "center",
        },
        {
            field: "image",
            headerName: t("product-img"),
            width: 400, headerAlign: "center", align: "center",
            renderCell: (params) => (
                <img src={params.value} alt={params.value} style={{ width: "100%", height: "auto" }} loading="lazy"/>
            ),
        },
        {
            field: "isCover",
            headerName: t("is_cover"), width: 200,
            headerAlign: "center", align: "center",
        },


        {
            field: "edit", headerName: t("edit-product"),
            headerAlign: "center", align: "center", width: 200,
            renderCell: (params) => (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    color="info"
                    component={Link}
                    to={`/distributor-control-panel/album/${productId}/${params.row.id}`}
                >
                    {t("edit")}
                </Button>
            )
        },
        {
            field: "delete", headerName: t("delete-product"),
            headerAlign: "center", align: "center", width: 200,
            renderCell: (params) => (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    color="error"
                    disabled={(btnDisabled === params.row.id && LoadingStatusDeleteUpdate) || params.row.isCover === true}
                    onClick={() => handleDelete(params.row.id)}
                >
                    {t("delete")}
                </Button>
            ),
        },
    ];

    const rows = albumItems?.map(({ id, is_cover, url }) => ({
        id,
        image: url,
        edit: t('edit'),
        delete: t("delete"),
        isCover: is_cover
    }));




















    return (
        <>
            {loadingGetAlbumItems ? (
                <LoadingFetching>{t("loading-albums")}</LoadingFetching>
            ) : (
                <>
                    <AppbarHeader data-aos="fade-up">{t("product-albums")}</AppbarHeader>
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
                            rowHeight={200}
                        // pagination={false}
                        />
                    </DataGridContainer>
                </>
            )
            }
            {albumItems.length < 3 && (
                <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    color="info"
                    fullWidth
                    component={Link}
                    to={`/distributor-control-panel/add-brand/${productId}`}
                >
                    {t('add-album-item')}
                </Button>
            )}
        </>
    )
}

export default Albums
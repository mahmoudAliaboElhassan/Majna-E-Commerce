import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import Swal from "sweetalert2";

import { DataGridContainer } from "@styles/dataGrid"
import { cleanUpStores, getStores, deleteStore } from "@state/slices/distributor";
import "@pages/shoppingCart/style.css"
import LoadingFetching from "@components/loadingFetching";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn";


function AllStores() {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { stores, loadingStores, countOfStores } = useSelector((state) => state.distributor);
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();
  const [btnDisabled, setbtnDisabled] = useState(null)
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn();

  useEffect(() => {
    dispatch(getStores({ Uid }));
    return () => {
      dispatch(cleanUpStores());
    };
  }, [countOfStores]);


  const handleDelete = useCallback(
    (storeId) => {
      setbtnDisabled(storeId)
      Swal.fire({
        title: t("suring"),
        text: t("info-store"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteStore({ Uid, storeId })).unwrap().then(() => {
            Swal.fire({
              title: t("deleting-store"),
              icon: "success",
              confirmButtonText: t("ok"),
            });
          }).catch((error) => {
            if (error.response.status === 409) {
              Swal.fire({
                title: t("store-related"),
                icon: "warning",
                confirmButtonText: t("ok"),
              });
            }
          })
        } else {
          Swal.fire({
            title: t("keeping-store"),
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
      field: "storeName",
      headerName: t("storeName"),
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: "governorate",
      headerName: t("governorate"),
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "city",
      headerName: t("storeCity"),
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "address",
      headerName: t("storeAddress"),
      headerAlign: 'center',
      align: 'center',
      width: 500,
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
          component={Link}
          to={`/distributor-control-panel/edit-store/${params.row.id}`}
          style={{ width: '30%' }}
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
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          onClick={() => handleDelete(params.row.id)}
          disabled={LoadingStatusDeleteUpdate && btnDisabled === params.row.id}
        >
          {t("delete")}
        </Button>
      ),
    },
  ];

  // Transform allBrands data into rows for the DataGrid
  const rows = stores?.map(({ id, name, governorate, city, address }) => ({
    id: id,
    storeName: name,
    governorate: governorate,
    city: city,
    address: address,
    edit: t("edit"),
  }));
  return (
    <>
      {loadingStores ? (
        <LoadingFetching>{t("loading-stores")}</LoadingFetching>
      ) : stores?.length ? (
        <>
          <AppbarHeader data-aos="fade-up">{t("your-stores")}</AppbarHeader>
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
        <Typography style={{ fontSize: "18px" }}>{t("no-stores")}</Typography>
      )}
    </>
  );
}

export default AllStores;

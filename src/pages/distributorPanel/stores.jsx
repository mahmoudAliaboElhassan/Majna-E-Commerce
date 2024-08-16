import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";

import { DataGridContainer } from "@styles/dataGrid"
import { cleanUpStores, getStores } from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";


function AllStores() {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { stores, loadingStores } = useSelector((state) => state.distributor);
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();

  useEffect(() => {
    dispatch(getStores({ Uid }));
    return () => {
      dispatch(cleanUpStores());
    };
  }, []);
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
      width: 150,
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

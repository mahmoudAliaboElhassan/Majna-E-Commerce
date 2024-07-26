import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import { cleanUpStores, getStores } from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";

function AllStores() {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { stores, loadingStores } = useSelector((state) => state.distributor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStores({ Uid }));
    return () => {
      dispatch(cleanUpStores());
    };
  }, []);
  const columns = [
    { field: "id", headerName: t("id"), width: 100 },
    {
      field: "storeName",
      headerName: t("storeName"),
      width: 150,
    },

    {
      field: "governorate",
      headerName: t("governorate"),
      width: 150,
    },
    {
      field: "city",
      headerName: t("storeCity"),
      width: 150,
    },
    {
      field: "edit",
      headerName: t("edit"),
      renderCell: (params) => (
        <Link to={`/distributor-control-panel/edit-store/${params.row.id}`}>
          {params.value}
        </Link>
      ),
    },
  ];

  // Transform allBrands data into rows for the DataGrid
  const rows = stores?.map(({ id, name, governorate, city }) => ({
    id: id,
    storeName: name,
    governorate: governorate,
    city: city,
    edit: t("edit"),
  }));
  return (
    <>
      {loadingStores ? (
        <LoadingFetching>{t("loading-stores")}</LoadingFetching>
      ) : stores.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={12}
          pagination={false}
        />
      ) : (
        <Typography style={{ fontSize: "18px" }}>{t("no-stores")}</Typography>
      )}
    </>
  );
}

export default AllStores;

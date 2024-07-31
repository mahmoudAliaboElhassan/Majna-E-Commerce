import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import {
  getAllBrandsApplication,
  cleanUpBrandsApplication,
} from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid"


function AllBrandsApplications() {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { distributorBrands, loadingDistributorApplications } = useSelector(
    (state) => state.distributor
  );
  console.log("distributorBrands.length");
  console.log(distributorBrands?.length);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrandsApplication({ Uid }));
    return () => {
      dispatch(cleanUpBrandsApplication());
    };
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: t("id"), width: 100 },
    {
      field: "brand",
      headerName: t("brand_name"),
      width: 150,
      renderCell: (params) => (
        <Link to={`/reviewer/brand/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "status",
      headerName: t("status"),
    },
  ];

  // Transform allBrands data into rows for the DataGrid
  const rows = distributorBrands?.map(({ id, brand, status }) => ({
    id: id,
    brand: brand,
    status: status,
  }));
  return (
    <>
      {loadingDistributorApplications ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : distributorBrands.length ? (
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
          // pagination={false}
          />
        </DataGridContainer>
      ) : (
        <Typography style={{ fontSize: "18px" }}>{t("no_brands")}</Typography>
      )}
    </>
  );
}

export default AllBrandsApplications;

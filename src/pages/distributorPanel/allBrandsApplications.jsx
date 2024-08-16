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
import { AppbarHeader } from "@styles/appbar";


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
    {
      field: "id",
      headerName: t("id"),
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "brand",
      headerName: t("brand_name"),
      width: 200,
      headerAlign: 'center',
      align: 'center',
      // renderCell: (params) => (
      //   <Link to={`/reviewer/brand/${params.row.id}`}>{params.value}</Link>
      // ),
    },
    {
      field: "status",
      headerName: t("status"),
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    {
      field: "date",
      headerName: t("data-added"),
      flex: 1,
      minWidth: 500,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  // Transform allBrands data into rows for the DataGrid
  const rows = distributorBrands?.map(({ id, brand, status, request_date }) => ({
    id: id,
    brand: brand,
    status: status,
    date: new Date(request_date)
  }));
  return (
    <>
      {loadingDistributorApplications ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : distributorBrands.length ? (
        <>
          <AppbarHeader data-aos="fade-up">{t("brand-applications")}</AppbarHeader>
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
        </>
      ) : (
        <Typography style={{ fontSize: "18px" }}>{t("no_brands")}</Typography>
      )}
    </>
  );
}

export default AllBrandsApplications;

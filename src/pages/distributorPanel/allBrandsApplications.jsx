import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import { getAllBrandsApplication } from "../../state/slices/distributor";
import LoadingFetching from "../../components/loadingFetching";

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
  }, []);
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
  const rows = distributorBrands?.map((brand) => ({
    id: brand.id,
    brand: brand.brand,
    status: brand.status,
  }));
  return (
    <>
      {loadingDistributorApplications ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : distributorBrands.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={12}
          pagination={false}
        />
      ) : (
        <Typography style={{ fontSize: "18px" }}>{t("no_brands")}</Typography>
      )}
    </>
  );
}

export default AllBrandsApplications;

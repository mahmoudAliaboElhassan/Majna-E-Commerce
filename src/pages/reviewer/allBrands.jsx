import React, { useCallback, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getBrandsReviewer, cleanUpBrandsReviewer } from "@state/slices/reviewer";
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid"
import UseThemeMode from "@hooks/use-theme";



function IndexReviewer() {
  const { themeMode } = UseThemeMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { allBrans, loadingReviewer, countOfBrands } = useSelector(
    (state) => state.reviewer
  );

  useEffect(() => {
    dispatch(getBrandsReviewer());
    return () => {
      dispatch(cleanUpBrandsReviewer())
    }
  }, []);
  const columns = [
    {
      field: "id",
      headerName: t("id"),
      headerAlign: 'center',
      width: 100,
      align: 'center',
    },
    {
      field: "brand",
      headerName: t("brand_name"),
      headerAlign: 'center',
      width: 200,
      align: 'center',
    },
    {
      field: "requestDate",
      headerName: t("request-date"),
      headerAlign: 'center',
      align: 'center',
      width: 500
    },
    {
      field: "view",
      headerName: t("view-brand"),
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 150,

      renderCell: (params) => (
        <Button
          component={Link}
          style={{ width: "60%" }}
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          to={`brand/${params.row.id}`}>
          {params.value}
        </Button>
      ),
    },
  ];


  // Transform allBrands data into rows for the DataGrid
  const rows = allBrans.map(({ id, brand, request_date }) => ({
    id: id,
    brand: brand,
    view: t('view'),
    requestDate: new Date(request_date),
  }));
  return (
    <>
      {loadingReviewer ? (
        <LoadingFetching>{t("loading-brands-applications")}</LoadingFetching>
      ) : (
        <>
          {countOfBrands ? (
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

          ) : (
            <Typography style={{ fontSize: "18px" }}>
              {t("no_brands")}
            </Typography>
          )}
        </>
      )
      }
    </>
  );
}

export default IndexReviewer;

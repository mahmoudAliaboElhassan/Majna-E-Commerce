import React, { useCallback, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PaginationComponent from "@components/pagination";
import { getBrandsPyPage, cleanUpBrandsByPage } from "@state/slices/reviewer";
import LoadingFetching from "@components/loadingFetching";
import { DataGridContainer } from "@styles/dataGrid"


function IndexReviewer() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const changePage = useCallback((e, value) => {
    setPage(value);
  }, []);
  const dispatch = useDispatch();

  const { allBrans, loadingReviewer, countOfBrands } = useSelector(
    (state) => state.reviewer
  );

  useEffect(() => {
    dispatch(getBrandsPyPage({ page }));
    return () => {
      dispatch(cleanUpBrandsByPage())
    }
  }, [page]);
  const columns = [
    { field: "id", headerName: t("id"), width: 100 },
    {
      field: "brand",
      headerName: t("brand_name"),
      width: 150,
      renderCell: (params) => (
        <Link to={`brand/${params.row.id}`}>{params.value}</Link>
      ),
    },
  ];

  // Transform allBrands data into rows for the DataGrid
  const rows = allBrans.map(({ id, brand }) => ({
    id: id,
    brand: brand,
  }));
  return (
    <>
      {loadingReviewer ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : (
        <>
          {countOfBrands ? (
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

              <PaginationComponent
                page={page}
                count={50}
                changePage={changePage}
              />
            </DataGridContainer>
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

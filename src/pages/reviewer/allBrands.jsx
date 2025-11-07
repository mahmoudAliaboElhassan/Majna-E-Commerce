import React, { useEffect } from "react"

import { DataGrid } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
  getBrandsReviewer,
  cleanUpBrandsReviewer,
} from "@state/slices/reviewer"
import LoadingFetching from "@components/loadingFetching"
import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
} from "@styles/dataGrid"
import UseThemeMode from "@hooks/use-theme"
import { AppbarHeader } from "@styles/appbar"

function BrandsApplications() {
  const { themeMode } = UseThemeMode()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { mymode } = useSelector((state) => state.mode)

  const { allBrans, loadingReviewer, countOfBrands } = useSelector(
    (state) => state.reviewer
  )

  useEffect(() => {
    dispatch(getBrandsReviewer())
    return () => {
      dispatch(cleanUpBrandsReviewer())
    }
  }, [dispatch])

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "brand",
      headerName: t("brand_name"),
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "requestDate",
      headerName: t("request-date"),
      headerAlign: "center",
      align: "center",
      width: 500,
    },
    {
      field: "view",
      headerName: t("view-brand"),
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          style={{ width: "60%" }}
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          to={`brand/${params.row.id}`}
        >
          {params.value}
        </Button>
      ),
    },
  ]

  // Transform allBrands data into rows for the DataGrid
  const rows = allBrans?.map(({ id, brand, request_date }) => ({
    id: id,
    brand: brand,
    view: t("view"),
    requestDate: new Date(request_date).toLocaleString(),
  }))

  return (
    <>
      <PageContainer>
        {loadingReviewer ? (
          <EmptyStateBox>
            <LoadingFetching>
              {t("loading-brands-applications")}
            </LoadingFetching>
          </EmptyStateBox>
        ) : countOfBrands ? (
          <>
            <AppbarHeader
              data-aos="fade-up"
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            >
              {t("brand-applications")}
            </AppbarHeader>
            <DataGridWrapper
              elevation={2}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                disableRowSelectionOnClick
                rowHeight={120}
              />
            </DataGridWrapper>
          </>
        ) : (
          <EmptyStateBox data-aos="fade-up">
            <EmptyStateText>{t("no_brands")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
    </>
  )
}

export default BrandsApplications

import React, { useEffect, useCallback } from "react";
import { Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import UseThemMode from "@hooks/use-theme";
import { AppbarHeader } from "@styles/appbar";
import LoadingFetching from "@components/loadingFetching";
import { getUploadedProducts, deleteUploadedProduct, cleanUpUploadedProducts } from "@state/slices/distributor";
import "@pages/shoppingCart/style.css"

function UploadedProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();
  const { Uid } = useSelector((state) => state.auth);
  const { uploadedProducts, loadingGetUploadedProducts, countOfUploadedProducts } = useSelector((state) => state.distributor);

  useEffect(() => {
    dispatch(getUploadedProducts({ distributorId: Uid }));
    return () => dispatch(cleanUpUploadedProducts());
  }, [dispatch, countOfUploadedProducts]);

  const handleDelete = useCallback(
    (productId) => {
      Swal.fire({
        title: t("suring"),
        text: t("info-product"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUploadedProduct({ distributorId: Uid, productId }));
          Swal.fire({
            title: t("deleting-product"),
            icon: "success",
            confirmButtonText: t("ok"),
          });
        } else {
          Swal.fire({
            title: t("keeping-product"),
            icon: "info",
            confirmButtonText: t("ok"),
          });
        }
      });
    },
    [dispatch, t, Uid]
  );

  const columns = [
    { field: "id", headerName: t("product-id"), width: 100 },
    { field: "name", headerName: t("product-name"), width: 150 },
    { field: "brand", headerName: t("product-brand"), width: 150 },
    {
      field: "image",
      headerName: t("product-img"),
      width: 200,
      renderCell: (params) => (
        <img src={params.value} alt={params.value} style={{ width: "100%", height: "auto" }} />
      ),
    },
    { field: "price", headerName: t("product-price"), width: 100 },
    {
      field: "view",
      headerName: t("view-product"),
      renderCell: (params) => <Link to={`/product-view/${params.row.id}`}>{t("view")}</Link>,
    },
    {
      field: "delete",
      headerName: t("delete-product"),
      renderCell: (params) => (
        <Button variant={themeMode === "dark" ? "contained" : "outlined"} color="error" onClick={() => handleDelete(params.row.id)}>
          {t("delete")}
        </Button>
      ),
    },
  ];

  const rows = uploadedProducts?.map((product) => ({
    id: product?.id,
    name: product?.name,
    brand: product?.brand,
    price: product?.price,
    image: product?.cover_image,
    view: t("view-product"),
    delete: t("delete"),
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Container>
        {loadingGetUploadedProducts ? (
          <LoadingFetching>{t("wait-uploaded-products")}</LoadingFetching>
        ) : countOfUploadedProducts ? (
          <>
            <AppbarHeader data-aos="fade-up">{t("uploaded-products")}</AppbarHeader>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 1000 }}> {/* Adjust minWidth based on the total width of your columns */}
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
              </Box>
            </Box>
          </>
        ) : (
          <div>{t("no-product-uploaded")}</div>
        )}
      </Container>
    </Box>
  );
}

export default UploadedProducts;

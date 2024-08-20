import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import PaginationComponent from "@components/pagination";
import LoadingFetching from "@components/loadingFetching";

const ShowProducts = ({ records, renderProducts, page, count, changePage }) => {
  const { t } = useTranslation()
  console.log("page from show products")
  console.log(page)
  const { loadingProducts, countOfProducts } = useSelector(
    (state) => state.products
  );
  return (
    <>
      {loadingProducts ? (
        <LoadingFetching>{t("load-products")}</LoadingFetching>
      ) : countOfProducts ? (
        records?.map((record) => renderProducts(record))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            fontSize: "19px",
            textAlign: "center",
          }}
        >
          {t("no-product")}
        </div>
      )}
      {countOfProducts
        ?
        (
          <Grid item xs={12} sm={12} md={12}>
            <PaginationComponent
              page={page}
              count={count}
              changePage={changePage}
            />
          </Grid>
        )
        : null
      }
    </>

  )
};
export default ShowProducts;

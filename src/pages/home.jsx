import React, { useCallback, useState, useEffect } from "react";

import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

import Swiperslide from "@components/slider";
import Product from "@components/productUi";
import ShowProducts from "@components/productUi/showProducts";
import PaginationComponent from "@components/pagination";
import UseThemMode from "@hooks/use-theme";
import ProjectsForm from "@components/formui/mutlipleCheckBox";
import SearchParamsComponent from "@components/searchParams";
import {
  getProducts,
  getProductsByCategory,
  cleanUpGetProducts,
  cleanUpgetProductsByCategory,
} from "@state/slices/products";
import Introductory from "@components/introductory";
import ProductTypesSidebar from "@components/sidebarFiltering";
import LoadingFetching from "@components/loadingFetching";
import Search from "@components/search";
import Footer from "@components/footer";
import { setPage } from "@state/slices/page";
import { useSearchParams } from "react-router-dom";

function Home() {
  // const [page, setPage] = useState(localStorage.getItem("page") || 1);
  const { page } = useSelector((state) => state.PageSlice);
  const { items } = useSelector((state) => state.cart);
  const { productsArray, loadingProducts, countOfProducts } = useSelector(
    (state) => state.products
  );
  const { searchValue } = useSelector((state) => state.search);
  const productsCount = Math.ceil(countOfProducts / 12);
  const dispatch = useDispatch();

  const changePage = useCallback(
    (e, value) => {
      localStorage.setItem("page", value);
      console.log("localStorage.getItem(page)");
      console.log(localStorage.getItem("page"));
      dispatch(setPage(value));
    },
    [page]
  );
  console.log("page :", page);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Function to update the search parameter

  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("category") || ""
  );
  const [priceFromTo, setPriceFromTo] = useState([
    localStorage.getItem("priceFrom"),
    localStorage.getItem("priceTo"),
  ]);
  const [price, setPrice] = useState(localStorage.getItem("price"));

  const handlePriceChange = useCallback(
    (index, value) => {
      const newPriceFromTo = [...priceFromTo];
      newPriceFromTo[index] = value;
      setPriceFromTo(newPriceFromTo);
    },
    [priceFromTo]
  );

  const handleClickPrice = useCallback(() => {
    localStorage.setItem("priceFrom", priceFromTo[0]);
    localStorage.setItem("priceTo", priceFromTo[1]);
    localStorage.setItem("price", priceFromTo.join(","));
    setPrice(priceFromTo.join(","));
    dispatch(setPage(1));
  }, [priceFromTo]);

  const resetPage = () => {
    dispatch(setPage(1));
  };

  const [ordering, setOrdering] = useState(null);
  const handleOrdering = useCallback((e) => {
    setOrdering(e.target.value);
  }, []);

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    localStorage.getItem("subCategory") || ""
  );
  const handleSelectedSubCategory = useCallback((value) => {
    dispatch(setPage(1));

    localStorage.setItem("subCategory", value);
    setSelectedSubCategory(value);
    console.log("selectedSubCategory");
  }, []);

  const handleProductsByCategory = useCallback(
    (id) => {
      localStorage.setItem("category", id);
      localStorage.removeItem("subCategory");
      setSelectedCategory(id);
      setSelectedSubCategory("");
      dispatch(setPage(1));
      id
        ? dispatch(
            getProductsByCategory({
              id: id,
              price__range: price,
              ordering,
              page,
              search: search,
              sub_category_id: selectedSubCategory,
            })
          )
        : dispatch(
            getProducts({
              price__range: price,
              ordering,
              page,
              search: search,
              sub_category_id: selectedSubCategory,
            })
          );
    },
    [dispatch, price, ordering, page, searchValue, selectedSubCategory, search]
  );

  useEffect(() => {
    selectedCategory
      ? dispatch(
          getProductsByCategory({
            id: selectedCategory,
            price__range: price,
            ordering,
            page,
            search: search,
            sub_category_id: selectedSubCategory,
          })
        )
      : dispatch(
          getProducts({
            price__range: price,
            ordering,
            page,
            search: search,
            sub_category_id: selectedSubCategory,
          })
        );
    return () => {
      dispatch(cleanUpGetProducts());
      dispatch(cleanUpgetProductsByCategory());
    };
  }, [
    dispatch,
    selectedCategory,
    price,
    ordering,
    page,
    searchValue,
    search,
    selectedSubCategory,
  ]);

  let productImages;
  if (productsArray) {
    productImages = productsArray.map(({ cover_image }) => cover_image);
    console.log("productImages");
    console.log(productImages);
  }

  return (
    <>
      <Swiperslide images={productImages} />
      <Introductory />
      <Search />
      <Grid container style={{ overflow: "hidden", marginBottom: "-16px" }}>
        <Grid item sm={2.5} xs={4} md={2.5}>
          <ProductTypesSidebar
            handlePriceChange={handlePriceChange}
            priceFromTo={priceFromTo}
            handleClickPrice={handleClickPrice}
            price={price}
            handleOrdering={handleOrdering}
            handleProductsByCategory={handleProductsByCategory}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            handleSelectedSubCategory={handleSelectedSubCategory}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          md={9.5}
          sm={9.5}
          spacing={1.5}
          sx={{
            padding: { xs: 2, sm: 3 },
            maxWidth: { sm: "calc(100% - 40px)", md: "calc(100% - 48px)" },
          }}
        >
          <ShowProducts
            records={productsArray}
            renderProducts={(product) => <Product {...product} />}
            page={page}
            count={productsCount}
            changePage={changePage}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;

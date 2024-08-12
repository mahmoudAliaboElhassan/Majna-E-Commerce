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

function Home() {
  const [page, setPage] = useState(1);
  const { items } = useSelector((state) => state.cart);
  const { productsArray, loadingProducts, countOfProducts } = useSelector(
    (state) => state.products
  );
  const { searchValue } = useSelector((state) => state.search)
  const productsCount = Math.ceil(countOfProducts / 12);
  const dispatch = useDispatch();

  const changePage = useCallback((e, value) => {
    setPage(value);
    console.log(page);
  }, [page]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleChange = useCallback((event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  }, []);
  const [priceFromTo, setPriceFromTo] = useState(["", ""]);
  const [price, setPrice] = useState("");

  const handlePriceChange = useCallback((index, value) => {
    const newPriceFromTo = [...priceFromTo];
    newPriceFromTo[index] = value;
    setPriceFromTo(newPriceFromTo);
  }, [priceFromTo]);

  const handleClickPrice = useCallback(() => {
    setPrice(priceFromTo.join(","));
  }, [priceFromTo]);

  const [color, setColor] = useState("");
  const handleChangeColor = useCallback((event) => {
    setColor(event.target.value);
    console.log(event.target.value);
  }, []);

  const [ordering, setOrdering] = useState(null);
  const handleOrdering = useCallback((e) => {
    setOrdering(e.target.value);
  }, []);

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const handleSelectedSubCategory = useCallback((value) => {
    setSelectedSubCategory(value);
    console.log("selectedSubCategory");
  }, []);

  const [productId, setProductId] = useState(null);
  const handleProductsByCategory = useCallback((id) => {
    setSelectedCategory(id);
    id
      ? dispatch(
        getProductsByCategory({
          id: id,
          price__range: price,
          ordering,
          page,
          search: searchValue,
          sub_category_id: selectedSubCategory,
        })
      )
      : dispatch(
        getProducts({
          price__range: price,
          ordering,
          page,
          search: searchValue,
          sub_category_id: selectedSubCategory,
        })
      );
  }, [dispatch, price, ordering, page, searchValue, selectedSubCategory]);

  useEffect(() => {
    selectedCategory
      ? dispatch(
        getProductsByCategory({
          id: selectedCategory,
          price__range: price,
          ordering,
          page,
          search: searchValue,
          sub_category_id: selectedSubCategory,
        })
      )
      : dispatch(
        getProducts({
          price__range: price,
          ordering,
          page,
          search: searchValue,
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
    color,
    ordering,
    page,
    searchValue,
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
            color={color}
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

import React, { useCallback, useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Footer from "@components/footer";
import Swiperslide from "@components/slider";
import Product from "@components/productUi";
import ShowProducts from "@components/productUi/showProducts";
import PaginationComponent from "@components/pagination";
import UseThemMode from "@hooks/use-theme";
import ProjectsForm from "@components/formui/mutlipleCheckBox";
import SearchParamsComponent from "@components/searchParams";
import Image from "../assests/image-1.jpg";
import { getProducts } from "@state/slices/products";
import Introductory from "@components/introductory";
import ProductTypesSidebar from "@components/sidebarFiltering";

function Home() {
  const [page, setPage] = useState(1);
  const { items } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const changePage = useCallback((e, value) => {
    setPage(value);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };

  const [priceFromTo, setPriceFromTo] = useState(["", ""]);
  const [price, setPrice] = useState("");

  const handlePriceChange = (index, value) => {
    const newPriceFromTo = [...priceFromTo];
    newPriceFromTo[index] = value;
    setPriceFromTo(newPriceFromTo);
  };

  const handleClickPrice = () => {
    setPrice(priceFromTo.join(","));
  };

  const [color, setColor] = useState("");
  const handleChangeColor = (event) => {
    setColor(event.target.value);
    console.log(event.target.value);
  };
  const [ordering, setOrdering] = useState(null);
  useEffect(() => {
    dispatch(
      getProducts({
        price_range: price,
        selectedCategory: selectedCategory,
        color: color,
        ordering,
      })
    );
  }, [selectedCategory, price, color, ordering]);

  const productInfo = products?.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const handleOrdering = (e) => setOrdering(e.target.value);
  return (
    <>
      <Swiperslide />
      <Introductory />

      <Grid container spacing={1} style={{ width: "100%" }}>
        <Grid item sm={2.5} xs={4} md={2.5}>
          <ProductTypesSidebar
            handleChange={handleChange}
            handlePriceChange={handlePriceChange}
            priceFromTo={priceFromTo}
            handleClickPrice={handleClickPrice}
            price={price}
            color={color}
            handleChangeColor={handleChangeColor}
            handleOrdering={handleOrdering}
          />
        </Grid>
        <Grid container item xs={9} md={9} sm={7} spacing={1.5}>
          <ShowProducts
            records={productInfo}
            renderProducts={(product) => <Product {...product} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <PaginationComponent page={page} count={35} changePage={changePage} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;

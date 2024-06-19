import React, { useCallback, useState, useEffect } from "react";

import { Container, Grid } from "@mui/material";

import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

import Footer from "@components/footer";
import Swiperslide from "@components/slider";
// import SidebarPrices from "@components/Sidebar";
import Product from "@components/productUi";
import ShowProducts from "@components/productUi/showProducts";
import PaginationComponent from "@components/pagination";
// import DateComponent from "@components/momentDate.jsx";
// import WhileView from "@components/formui/whileView.jsx";
import UseThemMode from "@hooks/use-theme";
// import MyComponent from "@searchandSelect.jsx";
import ProjectsForm from "@components/formui/mutlipleCheckBox";
import SearchParamsComponent from "@components/searchParams";
import Image from "../assests/image-1.jpg";
import { getProducts } from "@state/slices/products";
import ImageUploader from "@components/formui/multipleImages";
import Introductory from "@components/introductory";
import ProductTypesSidebar from "@components/productList/productTypesSidebar";
// import { DisplaySettings } from "@mui/icons-material";
// import SidebarFiltering from "@components/sidebarFiltering";

function Home() {
  const [page, setPage] = useState(1);
  const { items } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const changePage = useCallback((e, value) => {
    setPage(value);
  }, []);
  const data = [
    { title: "Product one", image: Image, id: 1, max: 2 },
    { title: "Product one", image: Image, id: 2, max: 3 },
    { title: "Product one", image: Image, id: 3, max: 4 },
    { title: "Product one", image: Image, id: 4, max: 5 },
    { title: "Product one", image: Image, id: 5, max: 6 },
    { title: "Product one", image: Image, id: 6, max: 10 },
    { title: "Product one", image: Image, id: 7, max: 11 },
    { title: "Product one", image: Image, id: 8 },
    { title: "Product one", image: Image, id: 9 },
    { title: "Product one", image: Image, id: 10 },
    { title: "Product one", image: Image, id: 11 },
    { title: "Product one", image: Image, id: 12 },
    { title: "Product one", image: Image, id: 13 },
    { title: "Product one", image: Image, id: 14 },
    { title: "Product one", image: Image, id: 15 },
    { title: "Product one", image: Image, id: 16 },
    { title: "Product one", image: Image, id: 17 },
    { title: "Product one", image: Image, id: 18 },
    { title: "Product one", image: Image, id: 19 },
    { title: "Product one", image: Image, id: 20 },
    { title: "Product one", image: Image, id: 21 },
    { title: "Product one", image: Image, id: 22 },
    { title: "Product one", image: Image, id: 23 },
    { title: "Product one", image: Image, id: 24 },
    { title: "Product one", image: Image, id: 25 },
    { title: "Product one", image: Image, id: 26 },
    { title: "Product one", image: Image, id: 27 },
    { title: "Product one", image: Image, id: 28 },
    { title: "Product one", image: Image, id: 29 },
    { title: "Product one", image: Image, id: 30 },
    { title: "Product one", image: Image, id: 31 },
    { title: "Product one", image: Image, id: 32 },
    { title: "Product one", image: Image, id: 33 },
    { title: "Product one", image: Image, id: 34 },
    { title: "Product one", image: Image, id: 35 },
    { title: "Product one", image: Image, id: 36 },
    { title: "Product one", image: Image, id: 37 },
    { title: "Product one", image: Image, id: 38 },
    { title: "Product one", image: Image, id: 39 },
    { title: "Product one", image: Image, id: 40 },
    { title: "Product one", image: Image, id: 41 },
    { title: "Product one", image: Image, id: 42 },
    { title: "Product one", image: Image, id: 43 },
    { title: "Product one", image: Image, id: 44 },
    { title: "Product one", image: Image, id: 45 },
    { title: "Product one", image: Image, id: 46 },
    { title: "Product one", image: Image, id: 47 },
    { title: "Product one", image: Image, id: 48 },
    { title: "Product one", image: Image, id: 49 },
    { title: "Product one", image: Image, id: 50 },
    { title: "Product one", image: Image, id: 51 },
    { title: "Product one", image: Image, id: 52 },
    { title: "Product one", image: Image, id: 53 },
    { title: "Product one", image: Image, id: 54 },
    { title: "Product one", image: Image, id: 55 },
    { title: "Product one", image: Image, id: 56 },
    { title: "Product one", image: Image, id: 57 },
    { title: "Product one", image: Image, id: 58 },
    { title: "Product one", image: Image, id: 59 },
    { title: "Product one", image: Image, id: 60 },
    { title: "Product one", image: Image, id: 61 },
    { title: "Product one", image: Image, id: 62 },
    { title: "Product one", image: Image, id: 63 },
    { title: "Product one", image: Image, id: 64 },
    { title: "Product one", image: Image, id: 65 },
    { title: "Product one", image: Image, id: 66 },
    { title: "Product one", image: Image, id: 67 },
    { title: "Product one", image: Image, id: 68 },
    { title: "Product one", image: Image, id: 69 },
    { title: "Product one", image: Image, id: 70 },
    { title: "Product one", image: Image, id: 71 },
    { title: "Product one", image: Image, id: 72 },
    { title: "Product one", image: Image, id: 73 },
    { title: "Product one", image: Image, id: 74 },
    { title: "Product one", image: Image, id: 75 },
    { title: "Product one", image: Image, id: 76 },
    { title: "Product one", image: Image, id: 77 },
    { title: "Product one", image: Image, id: 78 },
    { title: "Product one", image: Image, id: 79 },
    { title: "Product one", image: Image, id: 80 },
    { title: "Product one", image: Image, id: 81 },
    { title: "Product one", image: Image, id: 82 },
    { title: "Product one", image: Image, id: 83 },
    { title: "Product one", image: Image, id: 84 },
    { title: "Product one", image: Image, id: 85 },
    { title: "Product one", image: Image, id: 86 },
    { title: "Product one", image: Image, id: 87 },
    { title: "Product one", image: Image, id: 88 },
    { title: "Product one", image: Image, id: 99 },
  ];
  const productInfo = products?.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <>
      {/* <ImageUploader /> */}
      {/* <SearchParamsComponent /> */}
      <Swiperslide />
      <Introductory />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "green",
              color: "white",
            }}
          >
            electronics
          </div>
        </div>
      </Container>

      <Grid container spacing={1} style={{ width: "100%" }}>
        <Grid item sm={2.5} xs={2.5} md={2.5}>
          <ProductTypesSidebar />
          {/* <SidebarFiltering handleChange={handleChange} /> */}
        </Grid>
        {/* <Container> */}
        <Grid container item xs={9} md={9} sm={9} spacing={1.5}>
          <ShowProducts
            records={productInfo}
            renderProducts={(product) => <Product {...product} />}
          />
        </Grid>
        {/* </Container> */}

        <Grid item xs={12} sm={12} md={12}>
          {" "}
          <PaginationComponent page={page} count={35} changePage={changePage} />
        </Grid>
      </Grid>
      {/* <WhileView /> */}
      {/* <div data-aos="fade-up" data-aos-anchor-placement="top-center">
        hello i am mahmoud hello i am mahmoud hello i am mahmoud hello i am
        mahmoud hello i am mahmoud hello i am mahmoud hello i am mahmoud hello i
        am mahmoud hello i am mahmoud
      </div> */}
      {/* <DateComponent /> */}
      {/* <WhileView /> */}
      <Footer />
    </>
  );
}

export default Home;

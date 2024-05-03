import React, { useCallback, useState } from "react";

import { Container, Grid } from "@mui/material";

import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

import Footer from "@components/footer";
import Swiperslide from "@components/slider";
import SidebarPrices from "@components/Sidebar";
import Product from "@components/productUi";
import PaginationComponent from "@components/pagination";
import DateComponent from "@components/momentDate.jsx";
import WhileView from "@components/formui/whileView.jsx";
import UseThemMode from "@hooks/use-theme";
// import MyComponent from "@searchandSelect.jsx";
import ProjectsForm from "@components/formui/mutlipleCheckBox";
import SearchParamsComponent from "@components/searchParams";

function IndexElement() {
  const [page, setPage] = useState(1);
  const changePage = useCallback((e, value) => {
    setPage(value);
  }, []);

  return (
    <>
      <ProjectsForm />
      <SearchParamsComponent />
      <Swiperslide />
      <WhileView />
      <Container maxWidth="lg">
        <Grid container spacing={1.5} style={{ width: "100%" }}>
          <Grid item sm={1} xs={1} md={1}>
            <SidebarPrices />
          </Grid>

          <Grid container item xs={11} md={11} sm={11} spacing={1.5}>
            {Array(100)
              .fill()
              .map((_, idx) => (
                <Product idx={idx} />
              ))}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {" "}
            <PaginationComponent
              page={page}
              count={35}
              changePage={changePage}
            />
          </Grid>
        </Grid>
      </Container>{" "}
      <WhileView />
      <DateComponent /> <WhileView />
      <Footer />
    </>
  );
}

export default IndexElement;

import React, { useCallback, useState } from "react";

import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Image from "../assests/image-1.jpg";
import Footer from "../components/footer";
import { Colors } from "../styles/theme";
import Swiperslide from "../components/slider";
import SidebarPrices from "../components/Sidebar";
import UseThemMode from "../hooks/use-theme";
import PaginationComponent from "../components/pagination";
import DateComponent from "../components/momentDate.jsx";
import MyComponent from "../searchandSelect.jsx";
import WhileView from "../components/formui/whileView.jsx";

function IndexElement() {
  const { themeMode } = UseThemMode();
  const { ref, inView } = useInView({ triggerOnce: false });

  const [page, setPage] = useState(1);
  const changePage = useCallback((e, value) => {
    setPage(value);
  }, []);
  return (
    <>
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
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div
                    ref={ref}
                    initial={{ x: 50, opacity: 0 }}
                    // animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ amount: 0.6, once: false }}
                    // transition={{ delay: idx * 0.5, duration: 2 }}
                    style={{
                      border: `1px solid ${
                        themeMode === "dark" ? Colors.light_gray : Colors.shaft
                      }`,
                      borderRadius: "12px",
                    }}
                  >
                    <Box>
                      <Card raised>
                        <CardMedia
                          image={Image}
                          title="Random Image"
                          style={{ height: "180px", borderRadius: "12px" }}
                          component="img"
                          loading="lazy"
                          alt="Random Image"
                        />
                        <CardContent>
                          <Typography variant="h4">Heading</Typography>{" "}
                          <Typography variant="subtitle1">
                            Description this is is mata;
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button
                            variant="success"
                            size="small"
                            component={Link}
                            to={{
                              pathname: "/product/3",
                            }}
                          >
                            View
                          </Button>{" "}
                          <Button variant="success" size="small">
                            Add to Card
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  </motion.div>{" "}
                </Grid>
              ))}
          </Grid>
          <Grid item sm={12} sx={12} md={12}>
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

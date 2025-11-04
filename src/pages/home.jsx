import React, { useCallback, useState, useEffect } from "react"
import { Grid, Button, Badge, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { t } from "i18next"
import FilterListIcon from "@mui/icons-material/FilterList"

import Swiperslide from "@components/slider"
import Product from "@components/productUi"
import ShowProducts from "@components/productUi/showProducts"
import UseThemMode from "@hooks/use-theme"
import {
  getProducts,
  getProductsByCategory,
  cleanUpGetProducts,
  cleanUpgetProductsByCategory,
} from "@state/slices/products"
import Introductory from "@components/introductory"
import ProductTypesSidebar from "@components/sidebarFiltering"
import Search from "@components/search"
import Footer from "@components/footer"
import { setPage } from "@state/slices/page"
import { useSearchParams } from "react-router-dom"

function Home() {
  const { page } = useSelector((state) => state.PageSlice)
  const { productsArray, loadingProducts, countOfProducts } = useSelector(
    (state) => state.products
  )
  const { searchValue } = useSelector((state) => state.search)
  const productsCount = Math.ceil(countOfProducts / 12)
  const dispatch = useDispatch()
  const { themeMode } = UseThemMode()

  // Filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const toggleFilterDrawer = () => setIsFilterOpen(!isFilterOpen)

  const changePage = useCallback(
    (e, value) => {
      localStorage.setItem("page", value)
      dispatch(setPage(value))
    },
    [dispatch]
  )

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") || ""

  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("category") || ""
  )
  const [priceFromTo, setPriceFromTo] = useState([
    localStorage.getItem("priceFrom") || "",
    localStorage.getItem("priceTo") || "",
  ])
  const [price, setPrice] = useState(localStorage.getItem("price") || "")

  const handlePriceChange = useCallback(
    (index, value) => {
      const newPriceFromTo = [...priceFromTo]
      newPriceFromTo[index] = value
      setPriceFromTo(newPriceFromTo)
    },
    [priceFromTo]
  )

  const handleClickPrice = useCallback(
    (values) => {
      const priceFrom = values?.priceFrom || priceFromTo[0]
      const priceTo = values?.priceTo || priceFromTo[1]

      localStorage.setItem("priceFrom", priceFrom)
      localStorage.setItem("priceTo", priceTo)
      localStorage.setItem("price", `${priceFrom},${priceTo}`)
      setPrice(`${priceFrom},${priceTo}`)
      setPriceFromTo([priceFrom, priceTo])
      dispatch(setPage(1))
    },
    [priceFromTo, dispatch]
  )

  const handleResetPrice = useCallback(() => {
    localStorage.removeItem("priceFrom")
    localStorage.removeItem("priceTo")
    localStorage.removeItem("price")
    setPriceFromTo(["", ""])
    setPrice("")
    dispatch(setPage(1))
  }, [dispatch])

  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || ""
  )
  const handleOrdering = useCallback((e) => {
    const value = e.target.value
    localStorage.setItem("ordering", value)
    setOrdering(value)
  }, [])

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    localStorage.getItem("subCategory") || ""
  )

  const handleSelectedSubCategory = useCallback(
    (value) => {
      dispatch(setPage(1))
      localStorage.setItem("subCategory", value)
      setSelectedSubCategory(value)
    },
    [dispatch]
  )

  const handleProductsByCategory = useCallback(
    (id) => {
      localStorage.setItem("category", id)
      localStorage.removeItem("subCategory")
      setSelectedCategory(id)
      setSelectedSubCategory("")
      dispatch(setPage(1))
    },
    [dispatch]
  )

  // Clear all filters function
  const handleClearAllFilters = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem("category")
    localStorage.removeItem("subCategory")
    localStorage.removeItem("priceFrom")
    localStorage.removeItem("priceTo")
    localStorage.removeItem("price")
    localStorage.removeItem("ordering")

    // Reset states
    setSelectedCategory("")
    setSelectedSubCategory("")
    setPriceFromTo(["", ""])
    setPrice("")
    setOrdering("")
    dispatch(setPage(1))
  }, [dispatch])

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
        )
    return () => {
      dispatch(cleanUpGetProducts())
      dispatch(cleanUpgetProductsByCategory())
    }
  }, [
    dispatch,
    selectedCategory,
    price,
    ordering,
    page,
    searchValue,
    search,
    selectedSubCategory,
  ])

  let productImages
  if (productsArray) {
    productImages = productsArray.map(({ cover_image }) => cover_image)
  }

  // Count active filters
  const activeFiltersCount = [
    selectedCategory,
    selectedSubCategory,
    price,
    ordering,
  ].filter(Boolean).length

  return (
    <>
      <Swiperslide images={productImages} />
      <Introductory />
      <Search />

      <Grid container sx={{ overflow: "hidden", mb: 2 }}>
        {/* Desktop Sidebar - Show from md up */}
        <Grid
          item
          md={2.5}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <ProductTypesSidebar
            handlePriceChange={handlePriceChange}
            handleResetPrice={handleResetPrice}
            priceFromTo={priceFromTo}
            handleClickPrice={handleClickPrice}
            price={price}
            handleOrdering={handleOrdering}
            handleProductsByCategory={handleProductsByCategory}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            handleSelectedSubCategory={handleSelectedSubCategory}
            handleClearAllFilters={handleClearAllFilters}
            activeFiltersCount={activeFiltersCount}
            isDrawer={false}
            isOpen={false}
            onClose={() => {}}
          />
        </Grid>

        {/* Products Grid */}
        <Grid
          container
          item
          xs={12}
          md={9.5}
          spacing={2}
          sx={{
            padding: { xs: 2, sm: 3, md: 3 },
            maxWidth: {
              xs: "100%",
              md: "calc(100% - 48px)",
            },
          }}
        >
          {/* Mobile Filter Button - Show only on sm screens, hide on xs */}
          <Grid
            item
            xs={12}
            sx={{
              display: { xs: "block", md: "none" },
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={toggleFilterDrawer}
              startIcon={<FilterListIcon />}
              sx={{
                backgroundColor: themeMode === "light" ? "#f59e0b" : "#fbbf24",
                color: "white",
                fontWeight: 600,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor:
                    themeMode === "light" ? "#d97706" : "#f59e0b",
                },
                boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
              }}
            >
              <Badge
                badgeContent={activeFiltersCount}
                color="error"
                sx={{ mr: 1 }}
              >
                {t("filters") || "Filters"}
              </Badge>
            </Button>
          </Grid>

          <ShowProducts
            records={productsArray}
            renderProducts={(product) => <Product {...product} />}
            page={page}
            count={productsCount}
            changePage={changePage}
          />
        </Grid>
      </Grid>

      {/* Mobile Drawer - Only for sm screens */}
      <ProductTypesSidebar
        handlePriceChange={handlePriceChange}
        priceFromTo={priceFromTo}
        handleResetPrice={handleResetPrice}
        handleClickPrice={handleClickPrice}
        price={price}
        handleOrdering={handleOrdering}
        handleProductsByCategory={handleProductsByCategory}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        handleSelectedSubCategory={handleSelectedSubCategory}
        handleClearAllFilters={handleClearAllFilters}
        activeFiltersCount={activeFiltersCount}
        isDrawer={true}
        isOpen={isFilterOpen}
        onClose={toggleFilterDrawer}
      />

      <Footer />
    </>
  )
}

export default Home

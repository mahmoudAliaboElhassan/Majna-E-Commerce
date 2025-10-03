import React from "react"
import { Box, Typography, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ShoppingCart } from "@mui/icons-material"

import UseDirection from "@hooks/use-direction"
import UseThemMode from "@hooks/use-theme"
import Category from "@components/sidebarFiltering/category"
import Price from "@components/sidebarFiltering/price"
import Ordering from "@components/sidebarFiltering/ordering"
import SubCategory from "@components/sidebarFiltering/subCategory"

function ProductTypesSidebar({
  handlePriceChange,
  priceFromTo,
  handleClickPrice,
  price,
  handleOrdering,
  handleProductsByCategory,
  selectedCategory,
  selectedSubCategory,
  handleSelectedSubCategory,
}) {
  const { themeMode } = UseThemMode()
  const { Direction } = UseDirection()
  const { t } = useTranslation()

  const sidebarStyles = {
    // width: "280px",
    // minHeight: "calc(100vh - 64px)",
    // position: "sticky",
    // top: 0,
    [Direction.left]: 0,
    // backgroundColor: themeMode === "light" ? "#ffffff" : "#1e1e1e",
    borderRight: `1px solid ${themeMode === "light" ? "#e6e6e6" : "#2d2d2d"}`,
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      themeMode === "light"
        ? "0 2px 8px rgba(0,0,0,0.04)"
        : "0 2px 8px rgba(0,0,0,0.2)",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: themeMode === "light" ? "#f5f5f5" : "#1a1a1a",
    },
    "&::-webkit-scrollbar-thumb": {
      background: themeMode === "light" ? "#d4d4d4" : "#404040",
      borderRadius: "3px",
      "&:hover": {
        background: themeMode === "light" ? "#b8b8b8" : "#555",
      },
    },
  }

  const headerStyles = {
    padding: "24px 20px 20px",
    textAlign: "center",
    // backgroundColor: themeMode === "light" ? "#fafafa" : "#252525",
    borderBottom: `1px solid ${themeMode === "light" ? "#e6e6e6" : "#2d2d2d"}`,
    position: "sticky",
    top: 0,
    zIndex: 10,
    // background:
    //   themeMode === "light"
    //     ? "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)"
    //     : "linear-gradient(180deg, #252525 0%, #1e1e1e 100%)",
  }

  const contentStyles = {
    flex: 1,
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    // backgroundColor: themeMode === "light" ? "#ffffff" : "#1e1e1e",
  }

  return (
    <Box sx={sidebarStyles}>
      {/* Header */}
      <Box sx={headerStyles}>
        <ShoppingCart
          sx={{
            fontSize: 42,
            color: themeMode === "light" ? "#f59e0b" : "#fbbf24",
            mb: 1,
            filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.2))",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: themeMode === "light" ? "#111827" : "#f3f4f6",
            fontSize: { xs: "18px", sm: "20px", md: "22px" },
            letterSpacing: "0.5px",
          }}
        >
          {t("filters") || "Filters"}
        </Typography>
      </Box>

      {/* Filter Content */}
      <Box sx={contentStyles}>
        {/* Ordering */}
        <Ordering handleOrdering={handleOrdering} />

        <Divider
          sx={{
            my: 1.5,
            borderColor: themeMode === "light" ? "#e6e6e6" : "#2d2d2d",
            opacity: 0.6,
          }}
        />

        {/* Price */}
        <Price
          handlePriceChange={handlePriceChange}
          price={price}
          handleClickPrice={handleClickPrice}
          priceFromTo={priceFromTo}
        />

        <Divider
          sx={{
            my: 1.5,
            borderColor: themeMode === "light" ? "#e6e6e6" : "#2d2d2d",
            opacity: 0.6,
          }}
        />

        {/* Category */}
        <Category
          handleProductsByCategory={handleProductsByCategory}
          selectedCategory={selectedCategory}
        />

        <Divider
          sx={{
            my: 1.5,
            borderColor: themeMode === "light" ? "#e6e6e6" : "#2d2d2d",
            opacity: 0.6,
          }}
        />

        {/* Sub Category */}
        <SubCategory
          handleSelectedSubCategory={handleSelectedSubCategory}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
      </Box>
    </Box>
  )
}

export default ProductTypesSidebar

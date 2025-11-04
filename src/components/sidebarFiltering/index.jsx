import {
  Box,
  Typography,
  Divider,
  Drawer,
  Button,
  List,
  IconButton,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import FilterListIcon from "@mui/icons-material/FilterList"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

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
  handleResetPrice,
  price,
  handleOrdering,
  handleProductsByCategory,
  selectedCategory,
  selectedSubCategory,
  handleSelectedSubCategory,
  handleClearAllFilters,
  activeFiltersCount,
  isDrawer = false,
  isOpen = false,
  onClose = () => {},
}) {
  const { themeMode } = UseThemMode()
  const { Direction } = UseDirection()
  const { t } = useTranslation()

  // Desktop sidebar styles (static)
  const desktopSidebarStyles = {
    [Direction.left]: 0,
    borderRight: `1px solid ${themeMode === "light" ? "#e6e6e6" : "#2d2d2d"}`,
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
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

  const contentStyles = {
    flex: 1,
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }

  // Mobile drawer theme
  const DrawerTheme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 300,
            background:
              themeMode === "dark"
                ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
            borderTopRightRadius: Direction.direction === "rtl" ? 0 : "24px",
            borderBottomRightRadius: Direction.direction === "rtl" ? 0 : "24px",
            borderTopLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
            borderBottomLeftRadius: Direction.direction === "rtl" ? "24px" : 0,
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.15)"
                : "rgba(245, 158, 11, 0.15)"
            }`,
            boxShadow:
              themeMode === "dark"
                ? "0 8px 32px rgba(251, 191, 36, 0.2)"
                : "0 8px 32px rgba(245, 158, 11, 0.15)",
            backdropFilter: "blur(10px)",
            // Hide scrollbar
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        },
      },
    },
  })

  // Desktop content
  const desktopContent = (
    <Box sx={desktopSidebarStyles}>
      {/* Filter Content */}
      <Box sx={contentStyles}>
        <Ordering handleOrdering={handleOrdering} />

        <Divider
          sx={{
            my: 1.5,
            borderColor: themeMode === "light" ? "#e6e6e6" : "#2d2d2d",
            opacity: 0.6,
          }}
        />

        <Price
          handlePriceChange={handlePriceChange}
          handleResetPrice={handleResetPrice}
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

        <SubCategory
          handleSelectedSubCategory={handleSelectedSubCategory}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
      </Box>
    </Box>
  )

  // Mobile drawer content
  const mobileDrawerContent = (
    <List
      sx={{
        paddingTop: "70px",
        paddingBottom: "24px",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Close Icon - Fixed at top */}

      {/* Drawer Header with Clear Button - Fixed */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px 16px 20px",
          borderBottom: `1px solid ${
            themeMode === "dark"
              ? "rgba(251, 191, 36, 0.15)"
              : "rgba(245, 158, 11, 0.15)"
          }`,
          backgroundColor: themeMode === "dark" ? "#1e293b" : "#ffffff",
          zIndex: 999,
        }}
      >
        {" "}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: Direction.direction === "rtl" ? "auto" : 16,
            left: Direction.direction === "rtl" ? 16 : "auto",
            zIndex: 1000,
            backgroundColor:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(245, 158, 11, 0.1)",
            color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
            width: 36,
            height: 36,
            "&:hover": {
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(251, 191, 36, 0.2)"
                  : "rgba(245, 158, 11, 0.2)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 1,
          }}
        >
          <FilterListIcon
            sx={{
              fontSize: 36,
              color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
              filter: "drop-shadow(0 2px 8px rgba(245, 158, 11, 0.3))",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
              letterSpacing: "0.5px",
            }}
          >
            {t("filters") || "Filters"}
          </Typography>
        </Box>
        {/* Clear All Button */}
        {activeFiltersCount > 0 && (
          <Button
            onClick={handleClearAllFilters}
            startIcon={<RestartAltIcon />}
            fullWidth
            size="small"
            sx={{
              mt: 1,
              color: themeMode === "light" ? "#dc2626" : "#ef4444",
              border: `1px solid ${
                themeMode === "light" ? "#dc2626" : "#ef4444"
              }`,
              fontWeight: 600,
              fontSize: "13px",
              textTransform: "none",
              borderRadius: "8px",
              py: 0.8,
              "&:hover": {
                backgroundColor:
                  themeMode === "light"
                    ? "rgba(220, 38, 38, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                borderColor: themeMode === "light" ? "#b91c1c" : "#dc2626",
              },
            }}
          >
            {t("clear-all-filters") || "Clear All Filters"} (
            {activeFiltersCount})
          </Button>
        )}
      </Box>

      {/* Filter Sections */}
      <Box sx={{ padding: "0 16px" }}>
        {/* Ordering */}
        <Box
          sx={{
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "12px",
            background:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.05)"
                : "rgba(245, 158, 11, 0.03)",
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(245, 158, 11, 0.1)"
            }`,
          }}
        >
          <Ordering handleOrdering={handleOrdering} />
        </Box>

        <Divider
          sx={{
            margin: "20px 0",
            borderColor:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.15)"
                : "rgba(245, 158, 11, 0.15)",
          }}
        />

        {/* Price */}
        <Box
          sx={{
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "12px",
            background:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.05)"
                : "rgba(245, 158, 11, 0.03)",
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(245, 158, 11, 0.1)"
            }`,
          }}
        >
          <Price
            handlePriceChange={handlePriceChange}
            price={price}
            handleClickPrice={handleClickPrice}
            handleResetPrice={handleResetPrice}
            priceFromTo={priceFromTo}
          />
        </Box>

        <Divider
          sx={{
            margin: "20px 0",
            borderColor:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.15)"
                : "rgba(245, 158, 11, 0.15)",
          }}
        />

        {/* Category */}
        <Box
          sx={{
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "12px",
            background:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.05)"
                : "rgba(245, 158, 11, 0.03)",
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(245, 158, 11, 0.1)"
            }`,
          }}
        >
          <Category
            handleProductsByCategory={handleProductsByCategory}
            selectedCategory={selectedCategory}
          />
        </Box>

        <Divider
          sx={{
            margin: "20px 0",
            borderColor:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.15)"
                : "rgba(245, 158, 11, 0.15)",
          }}
        />

        {/* Sub Category */}
        <Box
          sx={{
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "12px",
            background:
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.05)"
                : "rgba(245, 158, 11, 0.03)",
            border: `1px solid ${
              themeMode === "dark"
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(245, 158, 11, 0.1)"
            }`,
          }}
        >
          <SubCategory
            handleSelectedSubCategory={handleSelectedSubCategory}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
          />
        </Box>
      </Box>
    </List>
  )

  // Return drawer for mobile - only show on sm screens
  if (isDrawer) {
    return (
      <ThemeProvider theme={DrawerTheme}>
        <Drawer anchor={Direction.left} open={isOpen} onClose={onClose}>
          {mobileDrawerContent}
        </Drawer>
      </ThemeProvider>
    )
  }

  // Return static sidebar for desktop
  return desktopContent
}

export default ProductTypesSidebar

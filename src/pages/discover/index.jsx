"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  IconButton,
  Avatar,
  Typography,
  CardActionArea,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getProducts } from "@state/slices/products";
import { postCart } from "@state/slices/cart";
import Footer from "@components/footer";
import LoadingFetching from "@components/loadingFetching";

export default function Discover() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);

  const { productsArray, loadingProducts, countOfProducts } = useSelector(
    (state) => state.products
  );
  const { loadingPostCart, countOfCartItems } = useSelector(
    (state) => state.cart
  );
  const { Uid, token, role } = useSelector((state) => state.auth);

  console.log("productsArray from discover", productsArray);
  const isRTL = i18n.language === "ar";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (!isBtnDisabled) return;
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  // Utility function to truncate text to specific character limit
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Utility function to get random elements from array
  const getRandomProducts = (array, count) => {
    if (!array || array.length === 0) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  };

  // Utility function to generate random rating
  const getRandomRating = () => {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // Random between 3.0 and 5.0
  };

  // Utility function to generate random reviews count
  const getRandomReviews = () => {
    return Math.floor(Math.random() * 200) + 20; // Random between 20 and 220
  };

  // Utility function to generate random discount
  const getRandomDiscount = () => {
    const discounts = [10, 15, 20, 25, 30];
    return discounts[Math.floor(Math.random() * discounts.length)];
  };

  // Utility function to generate random description if not available
  const generateRandomDescription = () => {
    const descriptions = [
      "High-quality product with excellent features and modern design. Perfect for everyday use and built to last.",
      "Premium item crafted with attention to detail. Offers great value and exceptional performance for all users.",
      "Innovative design meets functionality in this outstanding product. Ideal for both personal and professional use.",
      "Expertly designed with user comfort in mind. Features advanced technology and superior build quality.",
      "Versatile and reliable product that exceeds expectations. Perfect blend of style, comfort, and durability.",
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  // Handle Add to Cart functionality
  const handleAddToCart = (productId) => {
    setIsBtnDisabled(true);
    setActiveProductId(productId);

    if (!countOfCartItems || Number.parseInt(countOfCartItems) < 10) {
      console.log("Adding product to cart:", productId);
      dispatch(
        postCart({
          customerId: Uid,
          product_ids: [productId],
        })
      )
        .unwrap()
        .then(() => {
          toast.success(t("added-success") || "Added to cart successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          const errorMessages = {
            409: t("error-exist-cart") || "Product already exists in cart",
            401: t("error-not-authorized-text") || "Not authorized",
            403: t("error-not-customer-text") || "Customer access required",
          };

          const errorMessage =
            errorMessages[error.response?.status] || error.message;
          Swal.fire({
            title: t("error-adding") || "Error Adding Product",
            text: errorMessage,
            icon: "error",
            confirmButtonText: t("ok") || "OK",
          });
        });
    } else {
      Swal.fire({
        title: t("error-adding") || "Error Adding Product",
        text: t("excceeded-10") || "Maximum 10 items allowed in cart",
        icon: "error",
        confirmButtonText: t("ok") || "OK",
      });
    }
  };

  // Handle View All Products
  const handleViewAll = () => {
    setShowAllProducts(true);
    // Optionally fetch more products or navigate to a products page
    // navigate('/products')
  };

  // Categories with translations
  const categories = [
    { id: "electronics", name: t("electronics"), count: 245, icon: "📱" },
    { id: "fashion", name: t("fashion"), count: 189, icon: "👕" },
    { id: "home", name: t("homeGarden"), count: 156, icon: "🏠" },
    { id: "sports", name: t("sports"), count: 98, icon: "⚽" },
    { id: "books", name: t("books"), count: 234, icon: "📚" },
    { id: "beauty", name: t("beauty"), count: 167, icon: "💄" },
  ];

  // Featured products from productsArray
  const featuredProducts = useMemo(() => {
    if (!productsArray || productsArray.length === 0) return [];

    const productCount = showAllProducts
      ? Math.min(productsArray.length, 8)
      : 2;
    const randomProducts = getRandomProducts(productsArray, productCount);
    const badges = [
      t("bestSeller"),
      t("newArrival"),
      t("ecoFriendly"),
      t("proChoice"),
    ];

    return randomProducts.map((product, index) => {
      const discount = getRandomDiscount();
      const originalPrice = product.price * (1 + discount / 100);

      return {
        id: product.id,
        name: product.name,
        description: truncateText(
          product.description || generateRandomDescription(),
          120
        ),
        price: product.price,
        originalPrice: originalPrice,
        image: product.cover_image || "/placeholder.svg?height=300&width=300",
        rating: getRandomRating(),
        reviews: getRandomReviews(),
        badge: badges[index % badges.length],
        discount: discount,
      };
    });
  }, [productsArray, t, showAllProducts]);

  // Trending products from productsArray
  const trendingProducts = useMemo(() => {
    if (!productsArray || productsArray.length === 0) return [];

    const productCount = showAllProducts
      ? Math.min(productsArray.length, 6)
      : 3;
    const randomProducts = getRandomProducts(productsArray, productCount);
    const trendingPercentages = ["+15%", "+23%", "+18%", "+12%", "+28%"];

    return randomProducts.map((product, index) => ({
      id: product.id,
      name: product.name,
      description: truncateText(
        product.description || generateRandomDescription(),
        80
      ),
      price: product.price,
      image: product.cover_image || "/placeholder.svg?height=200&width=200",
      rating: getRandomRating(),
      trending: trendingPercentages[index % trendingPercentages.length],
    }));
  }, [productsArray, showAllProducts]);

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // Show loading state if products are loading
  if (loadingProducts) {
    return <LoadingFetching>{t("loading") || "Loading..."}</LoadingFetching>;
  }

  return (
    <Box>
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {t("heroTitle")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            {t("heroSubtitle")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Chip
              icon={<FlashOnIcon />}
              label={t("flashDeals")}
              sx={{ px: 2, py: 1 }}
            />
            <Chip
              icon={<StarIcon />}
              label={t("premiumQuality")}
              sx={{ px: 2, py: 1 }}
            />
            <Chip
              icon={<TrendingUpIcon />}
              label={t("trendingNow")}
              sx={{ px: 2, py: 1 }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            {t("shopByCategory")}
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={2} key={category.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                      "& .category-name": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      {category.icon}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="category-name"
                      sx={{ fontWeight: 600, transition: "color 0.3s ease" }}
                    >
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.count} {t("items")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                {t("featuredProducts")}
              </Typography>
              {!showAllProducts && (
                <Button
                  variant="outlined"
                  endIcon={
                    <ArrowForwardIcon
                      sx={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                    />
                  }
                  onClick={handleViewAll}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  {t("viewAll")}
                </Button>
              )}
            </Box>
            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={viewMode === "grid" ? 4 : 12}
                  key={product.id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: viewMode === "list" ? "row" : "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                        "& .product-actions": {
                          opacity: 1,
                        },
                        "& .product-image": {
                          transform: "scale(1.05)",
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardActionArea
                        component={Link}
                        to={`/product-view/${product.id}`}
                      >
                        <CardMedia
                          component="img"
                          height={viewMode === "list" ? 150 : 250}
                          image={product.image}
                          alt={product.name}
                          className="product-image"
                          sx={{
                            transition: "transform 0.3s ease",
                            width: viewMode === "list" ? 200 : "100%",
                          }}
                        />
                      </CardActionArea>
                      <Chip
                        label={product.badge}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          [isRTL ? "right" : "left"]: 8,
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                      />
                      <Box
                        className="product-actions"
                        sx={{
                          position: "absolute",
                          top: 8,
                          [isRTL ? "left" : "right"]: 8,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                        >
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          component={Link}
                          to={`/product-view/${product.id}`}
                          sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      {product.discount && (
                        <Chip
                          label={`-${product.discount}%`}
                          size="small"
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            [isRTL ? "right" : "left"]: 8,
                            bgcolor: "error.main",
                            color: "white",
                          }}
                        />
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: viewMode === "list" ? "auto" : 280,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          transition: "color 0.3s ease",
                          "&:hover": { color: "primary.main" },
                          mb: 1,
                          minHeight: "3rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          minHeight: "3rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({product.reviews})
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ fontWeight: "bold" }}
                          >
                            ${product.price}
                          </Typography>
                          {product.originalPrice && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              ${product.originalPrice.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddToCart(product.id)}
                          disabled={
                            loadingPostCart && activeProductId === product.id
                          }
                          sx={{ bgcolor: "primary.main" }}
                        >
                          {t("addToCart") || "Add"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Trending Section */}
        {trendingProducts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <TrendingUpIcon
                sx={{ mr: 2, color: "primary.main", fontSize: 32 }}
              />
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                {t("trendingNow")}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {trendingProducts.map((product) => (
                <Grid item xs={12} md={4} key={product.id}>
                  <Card
                    sx={{
                      "&:hover": { boxShadow: 4 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
                        <CardActionArea
                          component={Link}
                          to={`/product-view/${product.id}`}
                          sx={{ width: 80, height: 80, flexShrink: 0 }}
                        >
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            sx={{ width: 80, height: 80 }}
                            variant="rounded"
                          />
                        </CardActionArea>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              minHeight: "2.5rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              flexGrow: 1,
                              minHeight: "2rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.description}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Rating
                              value={product.rating}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                            <Chip
                              label={product.trending}
                              size="small"
                              sx={{
                                ml: 1,
                                bgcolor: "success.light",
                                color: "success.dark",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: "auto",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="primary.main"
                              sx={{ fontWeight: "bold" }}
                            >
                              ${product.price}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              component={Link}
                              to={`/product-view/${product.id}`}
                              sx={{
                                borderColor: "primary.main",
                                color: "primary.main",
                                "&:hover": {
                                  bgcolor: "primary.main",
                                  color: "white",
                                },
                              }}
                            >
                              {t("view") || "View"}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

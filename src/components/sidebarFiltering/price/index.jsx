import { TextField, Button, Box } from "@mui/material"
import { Form, Formik } from "formik"
import { useTranslation } from "react-i18next"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import SearchIcon from "@mui/icons-material/Search"
import UseInitialValues from "@utils/use-initial-values"
import UseFormValidation from "@formValidation/use-form-validation"
import UseThemeMode from "@hooks/use-theme"
import Typography from "@mui/material/Typography"
import { FilteringBox } from "@styles/products"

const Price = ({
  handlePriceChange,
  handleClickPrice,
  handleResetPrice,
  priceFromTo,
}) => {
  const { INITIAL_FORM_STATE_PRICES } = UseInitialValues()
  const { FORM_VALIDATION_SCHEMA_PRICES } = UseFormValidation()
  const { t } = useTranslation()
  const { themeMode } = UseThemeMode()

  const hasValues = priceFromTo?.[0] || priceFromTo?.[1]

  return (
    <FilteringBox>
      {/* Header with Reset Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            fontWeight: 700,
            color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
            letterSpacing: "0.3px",
          }}
        >
          {t("price") || "Price Range"}
        </Typography>

        {/* Reset Button - Shows only when there are values */}
        {hasValues && (
          <Button
            onClick={handleResetPrice}
            size="small"
            startIcon={<RestartAltIcon />}
            sx={{
              color: themeMode === "light" ? "#dc2626" : "#ef4444",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              minWidth: "auto",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor:
                  themeMode === "light"
                    ? "rgba(220, 38, 38, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            {t("reset") || "Reset"}
          </Button>
        )}
      </Box>

      <Formik
        initialValues={{
          priceFrom: priceFromTo?.[0] || "",
          priceTo: priceFromTo?.[1] || "",
        }}
        enableReinitialize
        validationSchema={FORM_VALIDATION_SCHEMA_PRICES}
        onSubmit={(values) => {
          handleClickPrice(values)
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            {/* Price From Field */}
            <TextField
              type="number"
              name="priceFrom"
              placeholder={t("price-from") || "Min Price"}
              value={values.priceFrom || ""}
              onChange={(e) => {
                handlePriceChange(0, e.target.value)
                setFieldValue("priceFrom", e.target.value)
              }}
              error={touched.priceFrom && Boolean(errors.priceFrom)}
              helperText={touched.priceFrom && errors.priceFrom}
              variant="outlined"
              margin="normal"
              fullWidth
              inputProps={{
                min: 0,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: themeMode === "dark" ? "#0f172a" : "#ffffff",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(251, 191, 36, 0.2)"
                        : "rgba(245, 158, 11, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(251, 191, 36, 0.4)"
                        : "rgba(245, 158, 11, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: themeMode === "dark" ? "#f3f4f6" : "#111827",
                  fontSize: "15px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                },
              }}
            />

            {/* Price To Field */}
            <TextField
              name="priceTo"
              type="number"
              placeholder={t("price-to") || "Max Price"}
              min={values.priceFrom ? parseInt(values.priceFrom, 10) + 1 : ""}
              value={values.priceTo || ""}
              onChange={(e) => {
                handlePriceChange(1, e.target.value)
                setFieldValue("priceTo", e.target.value)
              }}
              error={touched.priceTo && Boolean(errors.priceTo)}
              helperText={touched.priceTo && errors.priceTo}
              variant="outlined"
              margin="normal"
              fullWidth
              inputProps={{
                min: values.priceFrom ? parseInt(values.priceFrom, 10) + 1 : 0,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: themeMode === "dark" ? "#0f172a" : "#ffffff",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(251, 191, 36, 0.2)"
                        : "rgba(245, 158, 11, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(251, 191, 36, 0.4)"
                        : "rgba(245, 158, 11, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: themeMode === "dark" ? "#f3f4f6" : "#111827",
                  fontSize: "15px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                },
              }}
            />

            {/* Apply Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!values.priceFrom && !values.priceTo}
              // startIcon={<SearchIcon />}
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
                textTransform: "none",
                background:
                  themeMode === "dark"
                    ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#000",
                boxShadow:
                  themeMode === "dark"
                    ? "0 4px 12px rgba(251, 191, 36, 0.25)"
                    : "0 4px 12px rgba(245, 158, 11, 0.25)",
                "&:hover": {
                  background:
                    themeMode === "dark"
                      ? "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)"
                      : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  boxShadow:
                    themeMode === "dark"
                      ? "0 6px 16px rgba(251, 191, 36, 0.35)"
                      : "0 6px 16px rgba(245, 158, 11, 0.35)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: themeMode === "dark" ? "#374151" : "#e5e7eb",
                  color: themeMode === "dark" ? "#6b7280" : "#9ca3af",
                  boxShadow: "none",
                  cursor: "not-allowed",
                },
                transition: "all 0.3s ease",
              }}
            >
              {t("apply-price") || "Apply Price"}
            </Button>
          </Form>
        )}
      </Formik>
    </FilteringBox>
  )
}

export default Price

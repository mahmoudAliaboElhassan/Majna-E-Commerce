import * as React from 'react';
import { useField } from "formik";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function ProductRating({ name }) {
  const [field, meta] = useField(name);
  const { t } = useTranslation()
  // Configuration for the Rating component
  const configRating = {
    ...field,
    error: meta && meta.touched && Boolean(meta.error),
    size: "large"
  };

  return (
    <Box sx={{ '& > legend': { mt: 2 }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography component="legend">{t("rating")}</Typography>
      <Rating
        {...configRating}
      // value={Number(field.value) || 0} // Ensure the value is a number
      />

      {/* Conditionally show error text */}
      {meta && meta.touched && meta.error && (
        <Typography variant="body2" color="error">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
}

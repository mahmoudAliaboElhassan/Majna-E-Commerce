import { Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { PaymentBoxContainer } from "@styles/payment";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const { t } = useTranslation()

  return (
    <PaymentBoxContainer
    >
      <Box mb={4}>
        <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px" }}>
          {t("completed")}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.75rem" }}>
          {t("paied-success")}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#fff",
            padding: "8px", // Equivalent to p-2 in Tailwind
            borderRadius: "8px", // Equivalent to rounded-md
            marginTop: "20px", // Equivalent to mt-5
            color: "#a855f7", // Equivalent to text-purple-500
            fontSize: "2.5rem", // Equivalent to text-4xl
            fontWeight: "bold",
          }}
        >
          ${amount}
        </Paper>
      </Box>
    </PaymentBoxContainer>
  );
}

export default PaymentSuccess;

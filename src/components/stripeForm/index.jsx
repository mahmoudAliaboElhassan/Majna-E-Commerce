
import React, { useState, useEffect } from "react";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Box } from '@mui/material';
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next";

const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const { clientSecret } = useSelector((state) => state.customer)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount / 100}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (
    !clientSecret ||
    !stripe || !elements) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            height: '2rem',
            width: '2rem',
            borderRadius: '50%',
            border: '4px solid currentColor',
            borderRightColor: 'transparent',
            animation: 'spin 1.5s linear infinite',
            '@media (prefers-reduced-motion)': {
              animation: 'none',
            },
            color: 'text.surface',
          }}
          role="status"
        >
          <span
            style={{
              position: 'absolute',
              margin: '-1px',
              height: '1px',
              width: '1px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              border: '0',
              padding: '0',
              clip: 'rect(0, 0, 0, 0)',
            }}
          >
            {t("loading")}
          </span>
        </Box>
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret &&
        <PaymentElement />
      }

      {errorMessage && <div>{errorMessage}</div>}

      <button

        disabled={!stripe || loading}
        style={{
          color: 'white',
          width: '100%',
          padding: '20px',  // p-5 corresponds to 1.25rem, which is 20px
          backgroundColor: 'black',
          marginTop: '8px',  // mt-2 corresponds to 0.5rem, which is 8px
          borderRadius: '8px',  // rounded-md typically corresponds to 0.375rem, which is ~8px
          fontWeight: 'bold',
        }}

      >
        {!loading ? `${t("pay")} $${amount / 100}` : t("processing")}
      </button>
    </form>
  );
};

export default CheckoutPage;
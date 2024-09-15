import { useLocation, useSearchParams } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getPublisherKey } from "@state/slices/customer";
import CheckoutPage from "@components/stripeForm";
import LoadingFetching from "@components/loadingFetching";


// if (process.env.STRIPE_SECRET_KEY === undefined) {
//   throw new Error("STRIPE_SECRET_KEY is not defined");
// }

// "pk_test_51Pxx5DIIYZKV6Xi0546hQZkRv91CaFqH1uXSJKnE2sbYz7r4d2FJgqg3PfCqYcloWaLSBfho0EJkuzPFIKluU69l00C0YTjbPz"

export default function Payment() {


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPublisherKey())
  }, [])
  const { loadingGetPublisherKey, publisherKey } = useSelector((state) => state.customer)
  let stripePromise;
  if (!loadingGetPublisherKey && publisherKey) stripePromise = loadStripe(publisherKey);


  const [searchParams] = useSearchParams()
  const price = searchParams.get("price")
  const location = useLocation();
  const { t } = useTranslation()
  const { productName } = location.state || {};

  console.log(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
  return (
    <div>
      {loadingGetPublisherKey ?
        <LoadingFetching>{t('loading-payment-form')}</LoadingFetching>
        : (
          <Box
            sx={{
              // maxWidth: '72rem',
              margin: 'auto',
              p: 5,
              textAlign: 'center',
              color: 'white',
              border: '1px solid',
              m: 3,
              borderRadius: '8px',
              background: 'linear-gradient(to top right, #3b82f6, #a855f7)',
            }}
          >
            <Box sx={{ mb: 5 }}>
              <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: '800', mb: 2 }}>
                {productName}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                {t("has-requested")}
                <span style={{ fontWeight: 'bold' }}> ${price}</span>
              </Typography>
            </Box>

            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: (price * 100), //cent
                currency: "usd",
              }}
            >
              <CheckoutPage amount={price * 100} />
            </Elements>
          </Box>
        )}

    </div>
  );
}

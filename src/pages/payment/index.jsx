import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslation } from "react-i18next"
import { Box, Typography, Container } from "@mui/material"

import { getPublisherKey } from "@state/slices/customer"
import CheckoutPage from "@components/stripeForm"
import LoadingFetching from "@components/loadingFetching"
import { PaymentBoxContainer } from "@styles/payment"

// if (process.env.STRIPE_SECRET_KEY === undefined) {
//   throw new Error("STRIPE_SECRET_KEY is not defined");
// }

// "pk_test_51Pxx5DIIYZKV6Xi0546hQZkRv91CaFqH1uXSJKnE2sbYz7r4d2FJgqg3PfCqYcloWaLSBfho0EJkuzPFIKluU69l00C0YTjbPz"
const stripePromise = loadStripe(
  "pk_test_51PyrdGP7eKsdIhqmLphXqPOMxmcaFumS3iIEVoXlgLwAVG6nw3k7a2Pg8YP8gGIvQfxLlfKD5hskqbqfXKhb9W9900WSym3N2z"
)

export default function Payment() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPublisherKey())
  }, [])
  const { loadingGetPublisherKey, publisherKey } = useSelector(
    (state) => state.customer
  )

  const [searchParams] = useSearchParams()
  const price = searchParams.get("price")
  const location = useLocation()
  const { t } = useTranslation()
  const { productName } = location.state || {}

  return (
    <div>
      {loadingGetPublisherKey ? (
        <LoadingFetching>{t("loading-payment-form")}</LoadingFetching>
      ) : (
        <PaymentBoxContainer>
          <Container>
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h1"
                sx={{ fontSize: "2.5rem", fontWeight: "800", mb: 2 }}
              >
                {productName}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: "2rem" }}>
                {t("has-requested")}
                <span style={{ fontWeight: "bold" }}> ${price}</span>
              </Typography>
            </Box>

            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: price * 100, //cent
                currency: "usd",
              }}
            >
              <CheckoutPage amount={price * 100} />
            </Elements>
          </Container>
        </PaymentBoxContainer>
      )}
    </div>
  )
}

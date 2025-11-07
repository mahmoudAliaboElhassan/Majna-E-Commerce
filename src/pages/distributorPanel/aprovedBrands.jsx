import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Box, Typography, Card } from "@mui/material"

import {
  getAtuthorizedBrands,
  cleanUpAuthorizedBrands,
} from "@state/slices/distributor"
import LoadingFetching from "@components/loadingFetching"
import { AppbarHeader } from "@styles/appbar"
import { EmptyStateText, EmptyStateBox, PageContainer } from "@styles/dataGrid"

function ApprovedBrands() {
  const { t } = useTranslation()
  const { Uid } = useSelector((state) => state.auth)
  const { mymode } = useSelector((state) => state.mode)
  const { approvedBrands, loadingAuthorized } = useSelector(
    (state) => state.distributor
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAtuthorizedBrands({ Uid }))
    return () => {
      dispatch(cleanUpAuthorizedBrands())
    }
  }, [dispatch, Uid])

  return (
    <>
      <PageContainer>
        {loadingAuthorized ? (
          <EmptyStateBox>
            <LoadingFetching>{t("loading-approved-brands")}</LoadingFetching>
          </EmptyStateBox>
        ) : approvedBrands?.length ? (
          <>
            <AppbarHeader
              data-aos="fade-up"
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            >
              {t("approved-brands")}
            </AppbarHeader>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
                mt: 3,
              }}
            >
              {approvedBrands.map(({ name, id }, idx) => (
                <Card
                  key={id || idx}
                  // data-aos="fade-up"
                  // data-aos-delay={idx * 100}
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    border: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(251, 191, 36, 0.15)"
                          : "rgba(245, 158, 11, 0.15)"
                      }`,
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)"
                        : "linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(217, 119, 6, 0.01) 100%)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 8px 24px rgba(251, 191, 36, 0.2)"
                          : "0 8px 24px rgba(245, 158, 11, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
                    }}
                  >
                    {name}
                  </Typography>
                </Card>
              ))}
            </Box>
          </>
        ) : (
          <EmptyStateBox data-aos="fade-up">
            <EmptyStateText>{t("no_brands")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
    </>
  )
}

export default ApprovedBrands

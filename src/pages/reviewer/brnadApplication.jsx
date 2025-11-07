import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Grid, Typography, Box, Button, Paper } from "@mui/material"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"

import {
  UpdateBrandStatus,
  getSpecificBrand,
  cleanUpSpecifiedBrand,
} from "@state/slices/reviewer"
import PdfViewer from "@components/pdfFile"
import LoadingFetching from "@components/loadingFetching"
import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import { EmptyStateBox, PageContainer } from "@styles/dataGrid"
import { AppbarHeader } from "@styles/appbar"

function BrandApplication() {
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()
  const { mymode } = useSelector((state) => state.mode)
  const { Direction } = UseDirection()
  const { ApplicationId } = useParams()
  const [btnDisabled, setBtnDisabled] = useState(null)

  const {
    authorizationDocument,
    identityDocument,
    loadingSpecificBrand,
    brandName,
    loadingStatus,
  } = useSelector((state) => state.reviewer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSpecificBrand({ ApplicationId }))
    return () => {
      dispatch(cleanUpSpecifiedBrand())
    }
  }, [ApplicationId, dispatch])

  const handleStatus = (statusCondition) => {
    dispatch(UpdateBrandStatus({ id: ApplicationId, status: statusCondition }))
      .unwrap()
      .then(() => {
        toast.success(t(statusCondition), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: themeMode,
        })
        setTimeout(() => {
          navigate("/reviewer-control-panel")
        }, 1000)
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          Swal.fire({
            title: t("error_brand_updating"),
            text: t("error_brand_updating_text"),
            icon: "error",
            confirmButtonText: t("ok"),
          })
        }
      })
  }

  return (
    <PageContainer>
      {loadingSpecificBrand ? (
        <EmptyStateBox>
          <LoadingFetching>{t("loading_Single_brand")}</LoadingFetching>
        </EmptyStateBox>
      ) : (
        <>
          {!authorizationDocument || !identityDocument ? (
            <Paper
              elevation={2}
              data-aos="fade-up"
              sx={{
                p: 4,
                textAlign: "center",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(244, 67, 54, 0.3)"
                      : "rgba(244, 67, 54, 0.2)"
                  }`,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(211, 47, 47, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(244, 67, 54, 0.05) 0%, rgba(211, 47, 47, 0.02) 100%)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#ef5350" : "#f44336",
                }}
              >
                {t("data-not-loaded")}
              </Typography>
              <Button
                startIcon={<ThumbDownIcon />}
                fullWidth
                variant="contained"
                color="error"
                size="large"
                disabled={loadingStatus}
                onClick={() => handleStatus("rejected")}
                sx={{
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(244, 67, 54, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("reject_application")}
              </Button>
            </Paper>
          ) : (
            <>
              <AppbarHeader
                data-aos="fade-up"
                style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
              >
                {brandName}
              </AppbarHeader>

              <Paper
                elevation={2}
                data-aos="fade-up"
                data-aos-delay="100"
                sx={{
                  p: 3,
                  mb: 3,
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
                }}
              >
                <PdfViewer
                  fileAuthorize={authorizationDocument}
                  fileIdntity={identityDocument}
                />
              </Paper>

              <Box data-aos="fade-up" data-aos-delay="200">
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={6} md={5}>
                    <Button
                      startIcon={<ThumbUpAltIcon />}
                      color="success"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loadingStatus && btnDisabled === "accept"}
                      onClick={() => {
                        handleStatus("approved")
                        setBtnDisabled("accept")
                      }}
                      sx={{
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background:
                          "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 24px rgba(76, 175, 80, 0.4)",
                          background:
                            "linear-gradient(135deg, #45a049 0%, #388e3c 100%)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {t("accept_application")}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Button
                      startIcon={<ThumbDownIcon />}
                      variant="contained"
                      color="error"
                      fullWidth
                      size="large"
                      disabled={loadingStatus && btnDisabled === "reject"}
                      onClick={() => {
                        handleStatus("rejected")
                        setBtnDisabled("reject")
                      }}
                      sx={{
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background:
                          "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                        boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 24px rgba(244, 67, 54, 0.4)",
                          background:
                            "linear-gradient(135deg, #d32f2f 0%, #c62828 100%)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {t("reject_application")}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </>
      )}
    </PageContainer>
  )
}

export default BrandApplication

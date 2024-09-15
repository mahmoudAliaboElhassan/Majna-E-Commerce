import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Box, Button, makeStyles } from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";

import {
  UpdateBrandStatus,
  getSpecificBrand,
  cleanUpSpecifiedBrand,
} from "@state/slices/reviewer";
import PdfViewer from "@components/pdfFile";
import LoadingFetching from "@components/loadingFetching";
import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import "./style.css"

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    padding: "10px 20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    "&:hover": {
      opacity: 0.8,
    },
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  rejectButton: {
    backgroundColor: "#f44336",
    color: "white",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
}));

function BrnadApplication() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();
  const { ApplicationId } = useParams();
  const [btnDisabled, setBtnDisabled] = useState(null)
  console.log(ApplicationId);
  const {
    authorizationDocument,
    identityDocument,
    loadingSpecificBrand,
    brandName,
    loadingStatus,
  } = useSelector((state) => state.reviewer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSpecificBrand({ ApplicationId }));
    return () => {
      dispatch(cleanUpSpecifiedBrand());
    };
  }, [ApplicationId]);

  const handleStatus = (statusCondition) => {
    dispatch(UpdateBrandStatus({ id: ApplicationId, status: statusCondition }))
      .unwrap()
      .then(() => {
        console.log("success");
        {
          toast.success(t(statusCondition), {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: themeMode,
          });
        }
        setTimeout(() => {
          navigate("/reviewer-control-panel");
        }, 1000);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          Swal.fire({
            title: t("error_brand_updating"),
            text: t("error_brand_updating_text"),
            icon: "error",
            confirmButtonText: t("ok"),
          });
        }
      });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {loadingSpecificBrand ? (
        <LoadingFetching>{t("loading_Single_brand")}</LoadingFetching>
      ) : (
        <>
          {!authorizationDocument || !identityDocument ? (
            <>
              <Typography>{t('data-not-loaded')}</Typography>
              <Button
                startIcon={
                  <ThumbDownIcon
                    sx={{
                      [Direction.marginRight]: "8px",
                      fontSize: "25px !important",
                    }}
                  />
                }
                fullWidth
                variant="contained"
                color="warning"
                className={`${classes.button} ${classes.rejectButton}`}
                disabled={loadingStatus}
                onClick={() => handleStatus("rejected")}
              >
                {t("reject_application")}
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h2"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {brandName}
              </Typography>
              {/* <Grid container spacing={2}> */}
              {/* <Grid item xs={12} md={6} lg={6}> */}
              <PdfViewer
                fileAuthorize={authorizationDocument}
                fileIdntity={identityDocument}
              />

              <Box className={classes.buttonContainer}>
                <Grid container spacing={4} justifyContent='center'>
                  <Grid item xs={12} sm={6} md={6}  >
                    <Button
                      startIcon={
                        <ThumbUpAltIcon
                          sx={{
                            [Direction.marginRight]: "8px",
                            fontSize: "25px !important",
                          }}
                        />
                      }
                      color="success"
                      fullWidth
                      variant="contained"
                      className={`${classes.button} ${classes.acceptButton}`}
                      disabled={loadingStatus && btnDisabled === "accept"}
                      onClick={() => {
                        handleStatus("approved")
                        setBtnDisabled("accept")
                      }}
                    >
                      {t("accept_application")}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}  >
                    <Button
                      startIcon={
                        <ThumbDownIcon
                          sx={{
                            [Direction.marginRight]: "8px",
                            fontSize: "25px !important",
                          }}
                        />
                      }
                      variant="contained"
                      color="warning"
                      fullWidth
                      className={`${classes.button} ${classes.rejectButton}`}
                      disabled={loadingStatus && btnDisabled === "reject"}
                      onClick={() => {
                        handleStatus("rejected")
                        setBtnDisabled("reject")
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
    </>
  );
}

export default BrnadApplication;

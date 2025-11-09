import React, { useEffect } from "react"

import { Container, Grid, Typography, makeStyles } from "@material-ui/core"
import Card from "@mui/material/Card"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, useParams } from "react-router-dom"

import UseThemMode from "@hooks/use-theme"
import ButtonWrapper from "@components/formui/SubmitButton"
import { AppbarHeader } from "@styles/appbar"
import UseFormValidation from "@formValidation/use-form-validation"
import UseInitialValues from "@utils/use-initial-values"
import CheckboxWrapper from "@components/formui/CheckBox"
import { addAlbumItem } from "@state/slices/album"
import FileInput from "@components/formui/file"

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}))
const { INITAL_FORM_STATE_ADD_ALBUM } = UseInitialValues()

function AddAlbum() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { FORM_VALIDATION_SCHEMA_ADD_ALBUM } = UseFormValidation()
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()
  const { productId } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Container
        maxWidth="sm"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Card raised>
          <Container maxWidth="md">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item={12}>
                <Formik
                  initialValues={{
                    ...INITAL_FORM_STATE_ADD_ALBUM,
                  }}
                  validationSchema={FORM_VALIDATION_SCHEMA_ADD_ALBUM}
                  onSubmit={(values) => {
                    console.log({ ...values })
                    dispatch(
                      addAlbumItem({
                        productId: productId,
                        ...values,
                      })
                    )
                      .unwrap()
                      .then(() => {
                        {
                          toast.success(t("image-added"), {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: themeMode,
                          })
                        }
                        navigate(
                          `/distributor-control-panel/albums/${productId}`
                        )
                      })

                      .catch((error) => {
                        Swal.fire({
                          title: t(error.response.data.message),
                          text: t("error-wait-text"),
                          icon: "error",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: t("ok"),
                        })
                      })
                  }}
                >
                  <Form className={classes.formWrapper}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <AppbarHeader data-aos="fade-up">
                          {t("add-album-now")}
                        </AppbarHeader>
                      </Grid>{" "}
                      <Grid item xs={12} md={12} lg={12}>
                        <FileInput name="image" label={t("album-img")} />
                      </Grid>{" "}
                      <Grid item xs={12} md={12} lg={12}>
                        <CheckboxWrapper
                          name="is_cover"
                          label={t("is-cover")}
                          from={"add-album"}
                        />
                      </Grid>{" "}
                      <Grid item xs={12}>
                        <ButtonWrapper>{t("add-album")}</ButtonWrapper>{" "}
                      </Grid>
                    </Grid>{" "}
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </Container>
    </div>
  )
}

export default AddAlbum

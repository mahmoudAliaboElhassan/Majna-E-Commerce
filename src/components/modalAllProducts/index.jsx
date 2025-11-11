import React, { useEffect } from "react"
import {
  Modal,
  IconButton,
  Card,
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@mui/icons-material/Close"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Formik, Form } from "formik" // Import Formik
import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import { AppbarHeader } from "@styles/appbar"
import LoadingFetching from "@components/loadingFetching"
import SelectAddress from "@components/formui/selectAddress"
import {
  getAllAddresses,
  cleanUpGetAllAddresses,
  addOrder,
} from "@state/slices/customer"
import UseFormValidation from "@formValidation/use-form-validation"
import { deleteCarts } from "@state/slices/cart"
import { StyledCloseButton } from "../../styles/appbar"

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === "dark" ? theme.palette.common.white : "inherit",
    backgroundColor: "transparent !important",
    width: "100%",
  },
  containerWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}))

function ModalOrderAll({ openModalOrder, close, allProducts, totalPrice }) {
  const { t, i18n } = useTranslation()
  const { Uid, role } = useSelector((state) => state.auth)
  const { themeMode } = UseThemMode()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { Direction } = UseDirection()
  const { FORM_VALIDATION_SCHEMA_ADD_ORDER } = UseFormValidation()
  const { addresses, loadingGetAddresses } = useSelector(
    (state) => state.customer
  )

  const isRTL = i18n.language === "ar"

  useEffect(() => {
    if (Uid && role === "Customer") {
      dispatch(getAllAddresses({ customerId: Uid }))
    }
    return () => {
      dispatch(cleanUpGetAllAddresses())
    }
  }, [Uid, role, dispatch])

  const handleOrderSubmit = (values) => {
    close()
    const orderData = {
      pickup_address_id: values.pickup_address_id, // Accessing selected pickup address
      order_items: allProducts,
    }

    dispatch(addOrder(orderData))
      .unwrap()
      .then(() => {
        toast.success(t("order-success"), {
          position: "top-right",
          autoClose: 1000,
          theme: themeMode,
        })

        dispatch(deleteCarts({ customerId: Uid }))
        close() // Close the modal on success
        navigate(`/payment?price=${totalPrice}`)
      })
      .catch((error) => {
        console.log(error.response.data)
        const errorMessage = error.response.data
        const key = Object.keys(errorMessage)
        console.log("error keys", error.response.data["103"])
        const words = errorMessage[key].message
        const index = words.indexOf("#")

        const orderId = words.slice(index + 1) // Extracts everything after the #
        Swal.fire({
          title: `${t("order-id-error")} ${orderId}`,
          text: `${t("exists-in-store")} ${
            errorMessage[key].available_inventory
          }`,
          icon: "error",
          confirmButtonText: t("ok"),
        })
      })
  }

  // Reusable Close Button Component
  const CloseButton = () => (
    <StyledCloseButton onClick={close} themeMode={themeMode} isRTL={isRTL}>
      <CloseIcon
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
        }}
      />
    </StyledCloseButton>
  )

  return (
    <Modal
      open={openModalOrder}
      onClose={close}
      aria-labelledby="modal-for-add-order"
      aria-describedby="modal-description"
    >
      {loadingGetAddresses ? (
        <LoadingFetching>{t("wait-addresses")}</LoadingFetching>
      ) : (
        <Container maxWidth="sm" className={classes.containerWrapper}>
          <Box sx={{ position: "relative" }}>
            <CloseButton />

            {role === "Customer" ? (
              addresses?.length ? (
                <Card raised sx={{ pt: 2 }}>
                  <Container maxWidth="md">
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <AppbarHeader data-aos="fade-up">
                          {t("add-order-now")}
                        </AppbarHeader>
                      </Grid>
                      {/* Formik Form Starts Here */}
                      <Formik
                        initialValues={{ pickup_address_id: "" }}
                        onSubmit={handleOrderSubmit}
                        validationSchema={FORM_VALIDATION_SCHEMA_ADD_ORDER}
                      >
                        {({ values }) => (
                          <Form className={classes.formWrapper}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <SelectAddress
                                  name="pickup_address_id"
                                  label={t("address")}
                                  options={addresses}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  type="submit" // Submit button for the form
                                  variant={
                                    themeMode === "dark"
                                      ? "contained"
                                      : "outlined"
                                  }
                                  fullWidth
                                >
                                  {t("add-order")}
                                </Button>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                      {/* Formik Form Ends Here */}
                    </Grid>
                  </Container>
                </Card>
              ) : (
                <Card
                  sx={{
                    minWidth: "80%",
                    minHeight: { xs: "300px", sm: "80vh" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", sm: "18px" },
                      textAlign: "center",
                    }}
                  >
                    {t("no-addresses")}
                  </Typography>
                  <Button
                    onClick={close}
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    sx={{ fontSize: { xs: "16px", sm: "19px" } }}
                    component={Link}
                    to="/customer-control-panel/add-address"
                  >
                    {t("add-address")}
                  </Button>
                </Card>
              )
            ) : (
              <Card
                sx={{
                  minWidth: "80%",
                  minHeight: { xs: "300px", sm: "80vh" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                  p: 3,
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "16px", sm: "18px" },
                    textAlign: "center",
                  }}
                >
                  {t("login-now-add-address")}
                </Typography>
                <Button
                  onClick={close}
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  sx={{ fontSize: { xs: "16px", sm: "19px" } }}
                  component={Link}
                  to="/login"
                >
                  {t("login-now")}
                </Button>
              </Card>
            )}
          </Box>
        </Container>
      )}
    </Modal>
  )
}

export default ModalOrderAll

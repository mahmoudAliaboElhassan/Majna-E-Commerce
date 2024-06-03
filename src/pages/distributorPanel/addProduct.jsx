import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Form, Formik, useFormikContext } from "formik";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseThemMode from "@hooks/use-theme";
import ButtonWrapper from "@components/formui/SubmitButton";
import { AppbarHeader } from "@styles/appbar";
import UseFormValidation from "@formValidation/use-form-validation";
import UseInitialValues from "@utils/use-initial-values";
import SelectComp from "@components/formui/Select";
import FileInput from "@components/formui/file";
import {
  getStores,
  getAtuthorizedBrands,
  getCategories,
  getSubCategory,
  cleanUpStores,
  cleanUpAuthorizedBrands,
  cleanUpCategories,
  cleanUpSubCategories,
  addProduct,
} from "@state/slices/distributor";
import withGuard from "@utils/withGuard";
import LoadingFetching from "@components/loadingFetching";
import MultipleSelect from "@components/formui/multipleSelect";
import TextFieldWrapper from "@components/formui/textField";
import TextAreaWrapper from "@components/formui/textarea";
import ImageUploader from "../../components/formui/multipleImages";

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
}));
const { INITIAL_FORM_STATE_ADD_PRODUCT } = UseInitialValues();

const quoteKeys = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[`"${key}"`] = obj[key];
    return acc;
  }, {});
};

const processAlbumArray = (albumArray) => {
  return albumArray.map((item) => quoteKeys(item));
};

function SubCategorySelect({ subCategories }) {
  const { values } = useFormikContext();
  const selectedCategory = values.categories;

  const filteredSubCategories = subCategories.filter(
    (subcat) => subcat.id == selectedCategory
  );

  return (
    <SelectComp
      name="sub_category_pk"
      label="Sub Categories"
      options={filteredSubCategories}
    />
  );
}

function AddProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { FORM_VALIDATION_SCHEMA_Add_PRODUCT } = UseFormValidation();
  const { t } = useTranslation();
  const { themeMode } = UseThemMode();
  const { brands, loadingFetch } = useSelector((state) => state.distributor);
  const [count, setCount] = useState(1);
  const { Uid } = useSelector((state) => state.auth);
  const {
    approvedBrands,
    loadingAuthorized,
    stores,
    loadingStores,
    subCategories,
    categories,
  } = useSelector((state) => state.distributor);

  useEffect(() => {
    dispatch(getAtuthorizedBrands({ Uid }));
    dispatch(getStores({ Uid }));
    dispatch(getSubCategory());
    dispatch(getCategories());
    return () => {
      dispatch(cleanUpAuthorizedBrands());
      dispatch(cleanUpStores());
      dispatch(cleanUpCategories());
      dispatch(cleanUpSubCategories());
    };
  }, [dispatch]);

  const handleAddClick = () => {
    setCount(count + 1); // Increment count
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Container maxWidth="sm">
        <ToastContainer />
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
                    ...INITIAL_FORM_STATE_ADD_PRODUCT,
                  }}
                  validationSchema={FORM_VALIDATION_SCHEMA_Add_PRODUCT}
                  onSubmit={(values) => {
                    console.log({ ...values });
                    const { categories, ...productData } = values;
                    const processedAlbum = processAlbumArray(productData.album);
                    const processedInventory = processAlbumArray(
                      productData.inventory
                    );
                    const productDataWithQuotedKeys = {
                      ...productData,
                      album: processedAlbum,
                      inventory: processedInventory,
                    };
                    dispatch(addProduct(productDataWithQuotedKeys));
                  }}
                >
                  <Form className={classes.formWrapper}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>
                          <AppbarHeader>{t("add-product-now")}</AppbarHeader>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldWrapper
                          name="title"
                          label={t("product_title")}
                          autocomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageUploader />
                      </Grid>
                      <Grid item xs={12}>
                        <TextAreaWrapper
                          name="description"
                          textarea={3}
                          label={t("description")}
                          autocomplete="off"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectComp
                          name="categories"
                          label={t("categories")}
                          options={categories}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SubCategorySelect subCategories={subCategories} />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectComp
                          name="brand_pk"
                          label={t("approved_brands")}
                          options={approvedBrands}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldWrapper
                          name="price"
                          label={t("product_price")}
                          type="number"
                        />
                      </Grid>
                      {[...Array(count)].map((_, index) => (
                        <Grid item xs={12} key={index}>
                          <MultipleSelect
                            nameStore={`inventory.${index}.store_pk`}
                            nameQuantity={`inventory.${index}.quantity`}
                            options={stores}
                            label={`${t("quantity")} ${index + 1}`}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAddClick}>
                          +
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <ButtonWrapper>{t("add-product")}</ButtonWrapper>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </Container>
    </div>
  );
}

export default withGuard(AddProduct);

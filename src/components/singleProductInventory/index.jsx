import { useState } from "react";

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveIcon from '@mui/icons-material/Remove';

import MultipleSelect from "@components/formui/multipleSelect";
import UseThemeMode from "@hooks/use-theme";
import { StoreAdded } from "@styles/products";

const SingleProductInventory = ({ SingleProductInventory }) => {

  const { values, setFieldValue } = useFormikContext();

  console.log(SingleProductInventory)
  console.log("SingleProductInventory")
  const { stores } = useSelector((state) => state.distributor);
  console.log("stores")
  console.log(stores)
  const [count, setCount] = useState(SingleProductInventory?.length);
  const { themeMode } = UseThemeMode();



  const handleAddClick = () => {
    const newSingleInventory = [...values.singleProductInventory, { store_id: "", quantity: "" }];
    setFieldValue("singleProductInventory", newSingleInventory);
    setCount(newSingleInventory.length);
  };

  // Handle removing a specific select element by index
  const handleRemoveClick = (index) => {
    const newSingleInventory = values.singleProductInventory.filter((_, idx) => idx !== index);
    setFieldValue("singleProductInventory", newSingleInventory);
    setCount(newSingleInventory.length);
  };
  const { t } = useTranslation();

  return (
    <>
      {[...Array(count)]?.map((_, index) => (
        <Grid item xs={12} container key={index} alignItems="center" spacing={1}>
          <Grid item xs={11} >
            <MultipleSelect
              nameStore={`singleProductInventory.${index}.store_id`}
              nameQuantity={`singleProductInventory.${index}.quantity`}
              options={stores}
              labelQuantity={`${t("quantity")}`}
              labelStore={t("store-name")}
              mainNameArray="singleProductInventory"
            />
          </Grid>
          <Grid item xs={1} >
            <Button type="button" onClick={() => handleRemoveClick(index)}
              fullWidth
              variant="outlined"
              title={t('remove-store')}
              disabled={count === 1}
            >
              <RemoveIcon sx={{ color: themeMode === "dark" ? "white" : "black" }} />
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <StoreAdded
          variant="contained"
          onClick={handleAddClick}
          disabled={!stores.length || count >= stores.length}
          title={t('add-store')}
        >
          <ControlPointIcon sx={{ color: themeMode === "dark" ? "white" : "black" }} />
        </StoreAdded>
      </Grid>
    </>
  );
};

export default SingleProductInventory;

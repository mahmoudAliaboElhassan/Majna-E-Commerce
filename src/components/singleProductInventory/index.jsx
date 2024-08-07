import { useState } from "react";

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MultipleSelect from "@components/formui/multipleSelect";
import { StoreAdded } from "@styles/products";

const SingleProductInventory = ({ SingleProductInventory }) => {
  console.log(SingleProductInventory)
  console.log("SingleProductInventory")
  const { stores } = useSelector((state) => state.distributor);
  console.log("stores")
  console.log(stores)
  const [count, setCount] = useState(SingleProductInventory?.length);
  const { t } = useTranslation();



  const handleAddClick = () => {
    setCount(count + 1);
    // setFieldValue(`inventory.${count}`, { store_pk: "", quantity: "" });
  };

  return (
    <>
      {[...Array(count)]?.map((_, index) => (
        <Grid item xs={12} key={index}>
          <MultipleSelect
            nameStore={`singleProductInventory.${index}.store_id`}
            nameQuantity={`singleProductInventory.${index}.quantity`}
            // options={getFilteredOptions(index)}
            options={stores}
            labelQuantity={`${t("quantity")}`}
            labelStore={t("store-name")}
            mainNameArray="singleProductInventory"

          />
        </Grid>
      ))}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <StoreAdded
          variant="contained"
          onClick={handleAddClick}
          disabled={!stores.length || count >= stores.length}
          style={{
            opacity: !stores?.length || count >= stores?.length ? "0.3" : "1",
            opacity: !stores?.length || count >= stores?.length ? "0.3" : "1",
          }}
        >
          <ControlPointIcon />
        </StoreAdded>
      </Grid>
    </>
  );
};

export default SingleProductInventory;

import { useState } from "react";

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MultipleSelect from "@components/formui/multipleSelect";

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
        <Button
          variant="contained"
          onClick={handleAddClick}
          disabled={!stores.length || count >= stores.length}
          style={{
            borderRadius: "8px",
            background: "#160d203b",
            color: "white",
            border: "1px solid white",
            justifyContent: "center",
            width: "fit-content",
            boxShadow: "0px 0px 6px 1px #7f4949",
            fontWeight: "700",
            opacity: !stores?.length || count >= stores?.length ? "0.3" : "1",
            opacity: !stores?.length || count >= stores?.length ? "0.3" : "1",
          }}
        >
          <ControlPointIcon />
        </Button>
      </Grid>
    </>
  );
};

export default SingleProductInventory;

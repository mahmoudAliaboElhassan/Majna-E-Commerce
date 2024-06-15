import { useState } from "react";

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MultipleSelect from "@components/formui/multipleSelect";

const InventoryComp = () => {
  const { values, setFieldValue } = useFormikContext();
  const { stores } = useSelector((state) => state.distributor);
  const [count, setCount] = useState(1);
  const { t } = useTranslation();

  // Initialize selectedStoreIds with the current form values
  const selectedStoreIds = values.inventory.map((invent) => invent.store_pk);

  // Filter options for each select element
  const getFilteredOptions = (currentIndex) => {
    return stores.filter((store) => {
      const isSelected = selectedStoreIds.includes(store.id);
      const isCurrentValue =
        store.id === values.inventory[currentIndex]?.store_pk;
      console.log(!isSelected);
      console.log(!isSelected);
      return !isSelected || isCurrentValue;
    });
  };

  console.log(getFilteredOptions(2));

  // Handle add click to add new select element
  const handleAddClick = () => {
    setCount(count + 1);
    // setFieldValue(`inventory.${count}`, { store_pk: "", quantity: "" });
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <MultipleSelect
            nameStore={`inventory.${index}.store_pk`}
            nameQuantity={`inventory.${index}.quantity`}
            // options={getFilteredOptions(index)}
            options={stores}
            labelQuantity={`${t("quantity")}`}
            labelStore={t("store-name")}
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
            opacity: !stores.length || count >= stores.length ? "0.3" : "1",
          }}
        >
          <ControlPointIcon />
        </Button>
      </Grid>
    </>
  );
};

export default InventoryComp;

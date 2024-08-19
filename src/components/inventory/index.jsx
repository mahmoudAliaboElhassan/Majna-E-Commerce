import { useState } from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveIcon from '@mui/icons-material/Remove';

import MultipleSelect from "@components/formui/multipleSelect";
import { StoreAdded } from "@styles/products";

const InventoryComp = () => {
  const { values, setFieldValue } = useFormikContext();
  const { stores } = useSelector((state) => state.distributor);
  const { t } = useTranslation();

  // Set initial count based on the inventory length
  const [count, setCount] = useState(values.inventory.length);

  // Handle adding a new select element
  const handleAddClick = () => {
    const newInventory = [...values.inventory, { store_pk: "", quantity: "" }];
    setFieldValue("inventory", newInventory);
    setCount(newInventory.length);
  };

  // Handle removing a specific select element by index
  const handleRemoveClick = (index) => {
    const newInventory = values.inventory.filter((_, idx) => idx !== index);
    setFieldValue("inventory", newInventory);
    setCount(newInventory.length); // Update count to match the new length
  };

  return (
    <>
      {/* Render MultipleSelect components based on count */}
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} container key={index} alignItems="center" spacing={1}>
          <Grid item xs={11} >

            <MultipleSelect
              nameStore={`inventory.${index}.store_pk`}
              nameQuantity={`inventory.${index}.quantity`}
              options={stores}
              labelQuantity={t("quantity")}
              labelStore={t("store-name")}
              mainNameArray="inventory"
            />
          </Grid>
          <Grid item xs={1} >

            {/* Button to remove the current select element */}
            <Button type="button" onClick={() => handleRemoveClick(index)}
              disabled={count === 1}
              variant="contained"
              title={t('remove-store')}
            >
              <RemoveIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        {/* Button to add a new select element */}
        <StoreAdded
          variant="contained"
          onClick={handleAddClick}
          disabled={!stores.length || count >= stores.length}
        >
          <ControlPointIcon />
        </StoreAdded>
      </Grid>
    </>
  );
};

export default InventoryComp;

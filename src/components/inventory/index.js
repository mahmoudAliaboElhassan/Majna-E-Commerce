import {useState}from "react"

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
     
    Grid, Button
   
  } from "@material-ui/core";

import MultipleSelect from "@components/formui/multipleSelect";


const InventoryComp = () => {
  const { values } = useFormikContext();
  const { stores } = useSelector((state) => state.distributor);
  const [count, setCount] = useState(1);
  const { t } = useTranslation();
  const selectedStoreIds = values.inventory.map((invent) => invent.store_pk);
  console.log("selectedStoreIds");
  console.log(selectedStoreIds);
  const optionsStores = stores.filter((store) => {
    return !selectedStoreIds.includes(store.id);
  });
  console.log("optionsStores");
  console.log(optionsStores);
  const handleAddClick = () => {
    setCount(count + 1); // Increment count
  };
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <MultipleSelect
            nameStore={`inventory.${index}.store_pk`}
            nameQuantity={`inventory.${index}.quantity`}
            options={optionsStores}
            labelQuantity={`${t("quantity")}`}
            labelStore={t("store-name")}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddClick}>
          +
        </Button>
      </Grid>
    </>
  );
};
export default InventoryComp
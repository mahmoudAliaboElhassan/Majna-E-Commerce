import { memo } from "react";

import { Button } from "@mui/material";
import { Form } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./styles.module.css";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

const CartItem = ({ id, title, image }) => {
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={image} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>20 EGP</h3>
          <Button
            variant="secondary"
            style={{ width: "100px" }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>
      <div className={cartItemSelection}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={age}
            label="select"
            // onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>{" "}
      </div>
    </div>
  );
};

export default CartItem;

import { memo } from "react";

import { Button } from "@mui/material";
import { Form } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { deleteCartItem } from "@state/slices/cart";
import { updateQuantity } from "@state/act/actCarts";

const { cartItem, productItem, productImg, productInfo, cartItemSelection } =
  styles;

const CartItem = ({ id, title, product }) => {
  const { Uid } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleDeleteCart = () => {
    dispatch(deleteCartItem({ customerId: Uid, cartId: id }));
  };
  // const [quantity, setQuantity] = useState(null);
  const handleEditCart = () => {
    dispatch(
      updateQuantity({
        customerId: Uid,
        cartId: id,
        quantity: 6,
      })
    );
  };
  return (
    <div className={cartItem}>
      <div className={productItem}>
        <div className={productImg}>
          <img src={product.cover_image} alt={title} loading="lazy" />
        </div>
        <p>{id}</p>
        <div className={productInfo}>
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <h3>{product.brand}</h3>
          <h3>{product.quantity}</h3>
          <Button
            variant="secondary"
            style={{ width: "100px" }}
            className="mt-auto"
            onClick={handleDeleteCart}
          >
            Remove
          </Button>
          <Button
            variant="secondary"
            style={{ width: "100px" }}
            className="mt-auto"
            onClick={handleEditCart}
          >
            Edit
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
        <Link to={`/cart-item/${id}`}>View</Link>
      </div>
    </div>
  );
};

export default CartItem;

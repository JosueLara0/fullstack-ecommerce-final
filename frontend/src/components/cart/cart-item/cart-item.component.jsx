// Libraries
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Redux actions
import { updateCart } from "../../../store/actions/cart.actions";

// Components
import Button from "../../UI/button/button.component";

// Styles
import classes from "./cart-item.styles.module.css";

const CartItem = ({ product }) => {
  const { name, quantity, price, productId } = product;
  const priceFixed = parseFloat(price).toFixed(2);

  // State
  const [updateQty, setUpdateQty] = useState(quantity);

  // Refs
  const updateQtyInputRef = useRef();

  const dispatch = useDispatch();

  // Update Product Qty Handlers
  const onUpdateInputChangeHandler = () => {
    const updateQty = +updateQtyInputRef.current.value;

    if (updateQty < 0) return;

    setUpdateQty(updateQty);
  };

  const onUpdateProductHandler = () => {
    dispatch(updateCart(productId, updateQty));
  };

  return (
    <div className={classes["cart-item"]}>
      <div className={classes["cart-item__product"]}>
        <h3>{name}</h3>
        <p>Quantity: {quantity}</p>
        <p>${+priceFixed}</p>
      </div>
      <div className={classes["cart-item__actions"]}>
        <input
          type="number"
          value={updateQty}
          onChange={onUpdateInputChangeHandler}
          ref={updateQtyInputRef}
          className={classes["update-qty-input"]}
        />
        <Button type="button" onClick={onUpdateProductHandler} label="Update" />
        <Button type="button" label="Remove" />
      </div>
    </div>
  );
};

export default CartItem;

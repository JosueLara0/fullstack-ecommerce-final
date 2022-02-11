// Libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { fetchCart } from "../../store/actions/cart.actions";

// Components
import CartItem from "../../components/cart/cart-item/cart-item.component";

// Styles
import classes from "./cart.styles.module.css";

const Cart = () => {
  // State (Redux)
  const cartProducts = useSelector((state) => state.cart.selectedProducts);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  // Bring the products stored
  useEffect(() => {
    dispatch(fetchCart(token));
  }, [dispatch, token]);

  return (
    <div className={classes["cart-list"]}>
      {cartProducts?.length === 0 ? <h3>Empty Cart</h3> : <h2>Your Cart</h2>}
      {cartProducts?.length !== 0 &&
        cartProducts.map((cartProduct, index) => (
          <CartItem key={index} product={cartProduct} />
        ))}
    </div>
  );
};

export default Cart;

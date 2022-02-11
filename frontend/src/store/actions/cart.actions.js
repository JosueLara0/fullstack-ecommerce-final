// Libraries
import axios from "axios";

// Redux actions
import { cartActions } from "../slices/cart.slice";

export const fetchCart = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/get-cart`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      const { cart } = response.data.data;

      dispatch(cartActions.getCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = (productId, updateQty) => {
  const token = sessionStorage.getItem("token");

  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/update-cart-product`,
        {
          productId,
          newQuantity: updateQty,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch(cartActions.updateProductInCart({ productId, updateQty }));
    } catch (error) {
      console.log(error);
    }
  };
};

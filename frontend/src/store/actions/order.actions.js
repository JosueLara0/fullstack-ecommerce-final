// Libraries
import axios from "axios";

// Redux slices
import { ordersActions } from "../slices/orders.slice";

export const getOrders = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/get-orders`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      const { orders } = response.data.data;

      dispatch(ordersActions.getAllOrders(orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrderById = (id) => {
  const token = sessionStorage.getItem("token");

  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      const { order } = response.data.data;

      dispatch(ordersActions.getOrderById(order));
    } catch (error) {
      console.log(error);
    }
  };
};

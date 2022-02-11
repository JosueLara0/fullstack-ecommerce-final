// Libraries
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux actions
import { getOrders } from "../../store/actions/order.actions";

// Components
import OrderItem from "../../components/orders/order-item/order-item.component";

// Styles
import classes from "./orders.styles.module.css";

const Orders = () => {
  // State (Redux)
  const orders = useSelector((state) => state.order.orders);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  // Bring the orders stored
  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  return (
    <div className={classes["orders-list"]}>
      {orders?.length === 0 ? <h3>Empty</h3> : <h2>Products purchased</h2>}

      {orders &&
        orders.map((product) => (
          <OrderItem
            key={product.id}
            date={product.date}
            totalPrice={product.totalPrice}
            id={product.id}
          />
        ))}
    </div>
  );
};

export default Orders;

// Libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { getOrderById } from "../../../store/actions/order.actions";

// Components
import Button from "../../UI/button/button.component";
import OrderDetailsModal from "../order-details-modal/order-details-modal.component";

// Styles
import classes from "./order-item.styles.module.css";

const OrderItem = ({ date, totalPrice, id }) => {
  const totalPriceFixed = parseFloat(totalPrice).toFixed(2);

  // State (Redux)
  const order = useSelector((state) => state.order.orderById);

  // State
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // Modal Handlers
  const onOpenModal = () => {
    setShowModal(true);
    dispatch(getOrderById(id));
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={classes["order-item"]}>
      <h3>{date}</h3>
      <p className={classes["order-item__price"]}>Total: ${totalPriceFixed}</p>

      <div className={classes["order-item__button"]}>
        <Button onClick={onOpenModal} label="View order" type="button" />
      </div>

      {showModal && (
        <OrderDetailsModal id={id} data={order} onClose={onCloseModal} />
      )}
    </div>
  );
};

export default OrderItem;

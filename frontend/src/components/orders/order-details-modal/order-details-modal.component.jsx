// Components
import Modal from "../../UI/modal/modal.component";

// Styles
import classes from "./order-details-modal.styles.module.css";

const OrderDetailsModal = ({ onClose, data }) => {
  const { totalPrice, productsInOrders } = data;

  return (
    <Modal onClick={onClose}>
      <div className={classes["details__header"]}>
        <h2>Your order was for a total: ${totalPrice}</h2>
      </div>

      <div className={classes["details__items"]}>
        {productsInOrders &&
          productsInOrders.map((product, index) => (
            <div key={index} className={classes.item}>
              <p className={classes["item__name"]}>{product.product.name}</p>
              <p className={classes["item__qty"]}>{product.quantity}</p>
              <p className={classes["item__price"]}>${product.price}</p>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;

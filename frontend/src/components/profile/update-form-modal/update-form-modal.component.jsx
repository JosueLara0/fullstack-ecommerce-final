// Libraries
import { useRef } from "react";
import { useDispatch } from "react-redux";

// Redux actions
import { updateUser } from "../../../store/actions/user.actions";

// Components
import Modal from "../../UI/modal/modal.component";
import Button from "../../UI/button/button.component";
import Input from "../../UI/input/input.component";

// Styles
import classes from "./update-form-modal.style.module.css";

const UpdateFormModal = ({ onClose, currentUsername, currentEmail }) => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();

  const dispatch = useDispatch();

  // Handlers
  const onSubmitHandler = () => {
    let userName = usernameInputRef.current.value;
    let userEmail = emailInputRef.current.value;

    if (userName.length === 0) userName = usernameInputRef.current.placeholder;
    if (userEmail.length === 0) userEmail = emailInputRef.current.placeholder;

    dispatch(updateUser(userName, userEmail));
  };

  return (
    <Modal onClick={onClose}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <h3>You can update your profile here</h3>
        <Input
          label="Username"
          input={{
            type: "text",
            ref: usernameInputRef,
            placeholder: currentUsername,
          }}
        />
        <Input
          label="Email"
          input={{
            type: "email",
            ref: emailInputRef,
            placeholder: currentEmail,
          }}
        />
      </form>

      <div className={classes.actions}>
        <Button type="submit" label="Update" onClick={onSubmitHandler} />
        <Button type="button" onClick={onClose} label="Cancel" />
      </div>
    </Modal>
  );
};

export default UpdateFormModal;

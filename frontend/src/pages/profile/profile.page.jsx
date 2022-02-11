// Libraries
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux actions
import { getUserById } from "../../store/actions/user.actions";

// Components
import Button from "../../components/UI/button/button.component";
import UpdateFormModal from "../../components/profile/update-form-modal/update-form-modal.component";

// Styles
import classes from "./profile.styles.module.css";

const Profile = () => {
  const id = sessionStorage.getItem("userId");
  const { name, email } = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  // State
  const [showModal, setShowModal] = useState(false);

  // Modal Handlers
  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  // Bring the user profile info
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch]);

  return (
    <div>
      <div className={classes["user-data"]}>
        <h3 className={classes["user-data__username"]}>{name}</h3>

        <div className={classes["button-container"]}>
          <Button type="button" label="Update profile" onClick={onOpenModal} />
        </div>
      </div>

      {showModal && (
        <UpdateFormModal
          currentUsername={name}
          currentEmail={email}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default Profile;

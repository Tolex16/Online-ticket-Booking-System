import React from "react";
import Styles from "./LoginModal.module.css";


const DeleteModal = ({ isOpen, onClose, onDelete, children }) => {

  const handleDelete = () => {
    // Call onDelete function to execute the delete action
    onDelete();
    // Close the modal after executing the action
    onClose();
  };

  const handleCancel = () => {
    // Close the modal without executing the action
    onClose();
  };

  return (
    <>
      {isOpen && <div className={Styles.modaloverlay} onClick={onClose}>
        <div className={Styles.modal}>
            <span className={Styles.close}>
              <strong>&times;</strong>{" "}
            </span>
            <div className={Styles.modalcontent}>
            <p className={Styles.message}>Are you sure you want to delete this item?</p>
          <div className={Styles.buttons}>
            <button className={Styles.login} onClick={handleDelete}>Yes</button>
            <button className={Styles.cancel} onClick={handleCancel}>No</button>
          </div>
        </div>
          {children}
        </div>
      </div>}
    </>
  );
};

export default DeleteModal;
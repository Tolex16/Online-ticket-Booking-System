import React from "react";
import Styles from "./LoginModal.module.css";
import { useNavigate } from "react-router-dom";


const LoginModal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }; 

    const onCreateAccount = async (e) => {
      e.preventDefault();
  
      try {
          navigate("/register-passenger");
        } catch (error) {
          console.log(error);
        }
      }; 

  return (
    <>
      {isOpen && <div className={Styles.modaloverlay} onClick={onClose}>
        <div className={Styles.modal}>
            <span className={Styles.close}>
              <strong>&times;</strong>{" "}
            </span>
            <div className={Styles.modalcontent}>
          <p className={Styles.message}>You need to login or create an account to proceed.</p>
          <div className={Styles.buttons}>
            <button className={Styles.login} onClick={onLogin}>Login</button>
            <button className={Styles.createaccount} onClick={onCreateAccount}>Create Account</button>
          </div>
        </div>
          {children}

        </div>
      </div>}
    </>
  );
};

export default LoginModal;

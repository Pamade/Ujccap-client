import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import styles from "./modal.module.scss";
import ReactDOM from "react-dom";
import { useResendVerificationToken } from "../../hooks/useResendVerificationToken";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const { sendToken, loading } = useResendVerificationToken();
  const {
    state: { user },
  } = useContext(AuthContext);
  const getModal = localStorage.getItem("showModal");

  const handleCloseModal = async () => {
    localStorage.removeItem("showModal");
    setShowModal(false);
    setIsModalOpen(false);
  };

  const resendVerify = async () => {
    await sendToken();
    setIsModalOpen(false);
  };

  useEffect(() => {
    !getModal && setShowModal(false);
  }, [getModal]);

  if (!isModalOpen || !showModal) return <></>;
  return ReactDOM.createPortal(
    <section className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>
          {loading && <span>Sending...</span>}
          <h3 className={styles.h3}>Verify Email</h3>
          <p>Your email is not verified! Verify email, to be able to sell</p>
          <p>{user?.email}</p>
          <div>
            <button onClick={resendVerify} className={styles.btn}>
              Send mail
            </button>
            <button onClick={handleCloseModal} className={styles.btn}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </section>,
    document.getElementById("modal-portal") as HTMLElement
  );
};

export default Modal;

import styles from "./profile-submit-btn.module.scss";

const ProfileSubmitButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      disabled={loading}
      className={!loading ? styles.btn : `${styles.btn} ${styles.loading}`}
    >
      Submit
    </button>
  );
};

export default ProfileSubmitButton;

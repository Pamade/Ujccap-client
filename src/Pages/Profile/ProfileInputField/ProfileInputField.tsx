import styles from "./profile-input.module.scss";

interface Props<T> {
  name: string;
  value: string;
  label: string;
  data: {
    data: T;
    updatedData: React.Dispatch<React.SetStateAction<T>>;
  };
  type: "email" | "password" | "text" | "number";
  disabled?: boolean;
}

function ProfileInputField<T>({
  name,
  value,
  label,
  data,
  disabled,
  type,
}: Props<T>) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { updatedData, data: dataCredentials } = data;

    if (updatedData && data) {
      updatedData({
        ...dataCredentials,
        [e.target.name]:
          e.target.name === "phoneNumber"
            ? Number(e.target.value)
            : e.target.value,
      });
    }
  };

  return (
    <div className={styles.info_wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        onChange={handleOnChange}
        name={name}
        disabled={disabled}
        className={styles.input}
        value={value}
      />
    </div>
  );
}
export default ProfileInputField;

import { useRef, useEffect } from "react";
import styles from "./avatar.module.scss";
import { useFileRead } from "../../../hooks/useFileRead";
import { useHandleApiCall } from "../../../hooks/useHandleApiCall";
import { toast } from "react-toastify";
import ErrorAlert from "../../../Components/errorAlert/ErrorAlert";
import { User } from "../../../types/types";

interface Props {
  user: User;
  changable: boolean;
}

const Avatar = ({ user, changable }: Props) => {
  const { fileDataURL, file, handleChange } = useFileRead();
  const { handleApiCall } = useHandleApiCall("PATCH", true);

  const avatarRef = useRef<null | HTMLInputElement>(null);

  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };

  useEffect(() => {
    const updateAvatar = () => {
      const formData = new FormData();

      file && formData.append("avatar", file);

      handleApiCall(
        `/userProfile/updateAvatar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
        (data, error) => {
          if (typeof data === "string") {
            toast.success(data);
          } else if (typeof error === "object") {
            toast.error(() => <ErrorAlert error={error} />);
          }
        }
      );
    };

    if (fileDataURL) {
      updateAvatar();
    }
  }, [fileDataURL]);

  return (
    <>
      <input
        onChange={handleChange}
        ref={avatarRef}
        type="file"
        className={styles.input}
      />
      <img
        onClick={changable ? handleAvatarClick : () => null}
        className={
          changable
            ? `${styles.avatar_changable} ${styles.avatar}`
            : styles.avatar
        }
        src={(fileDataURL as string) || user?.avatar}
        alt={"avatar"}
      />
    </>
  );
};

export default Avatar;

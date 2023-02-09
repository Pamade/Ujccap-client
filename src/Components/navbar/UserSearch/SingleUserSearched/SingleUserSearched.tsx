import { User } from "../../../../types/types";
import styles from "./single-user-searched.module.scss";
import { Link } from "react-router-dom";
interface Props {
  user: User;
}

const SingleUserSearched = ({ user }: Props) => {
  return (
    <li className={styles.li}>
      <Link to={`/user/${user._id}`}>
        <img src={user.avatar} alt="avatar" className={styles.img} />
        <p className={styles.label}>{user.email}</p>
        <p className={styles.label}>{user.seller?.name}</p>
      </Link>
    </li>
  );
};

export default SingleUserSearched;

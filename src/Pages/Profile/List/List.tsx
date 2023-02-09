import { NavLink, Outlet } from "react-router-dom";
import styles from "./list.module.scss";

const Links = [
  {
    label: "Details",
    to: "/profile/informations",
  },
  {
    label: "Selling Offers",
    to: "/profile/selling-offers",
  },
  {
    label: "Favourites",
    to: "/profile/favourites",
  },
  {
    label: "Account",
    to: "/profile/account",
  },
];

const List = () => {
  return (
    <>
      <ul className={styles.profile_list}>
        {Links.map((item) => (
          <li key={item.to}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.is_active} ${styles.link}` : styles.link
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.section}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default List;

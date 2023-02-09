import { useState, useContext, useEffect } from "react";
import styles from "./navbar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useLocation } from "react-router-dom";
import ProfileLinks from "./ProfileLinks/ProfileLinks";
import { FiltersContext } from "../../context/FiltersContext/FiltersContext";

import UserSearch from "./UserSearch/UserSearch";
const Navbar = () => {
  const location = useLocation();
  const {
    state: { user },
  } = useContext(AuthContext);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const { dispatch } = useContext(FiltersContext);

  useEffect(() => {
    setIsNavOpen(false);
    setIsProfileNavOpen(false);
  }, [location]);

  const authLinks = (
    <div className={styles.login_content}>
      {user ? (
        <div className={styles.avatar_logout_container}>
          <div className={styles.box_container}>
            {isProfileNavOpen && (
              <ProfileLinks setIsProfileNavOpen={setIsProfileNavOpen} />
            )}

            <img
              onClick={() => setIsProfileNavOpen(!isProfileNavOpen)}
              className={styles.img}
              alt="avatar"
              src={user?.avatar}
            />
          </div>
          <Link to="/logout" className={styles.login}>
            Logout
          </Link>
        </div>
      ) : (
        <>
          <Link to="/login" className={styles.login}>
            Login
          </Link>
          <Link to="/register" className={styles.login}>
            Register
          </Link>
        </>
      )}
    </div>
  );

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbar_content_mobile}`}>
        <div className={styles.loop_container}>
          <AiOutlineSearch
            className={styles.loop}
            onClick={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
        <Link
          onClick={() => dispatch({ type: "RESET_STATE" })}
          to="/"
          className={styles.goHome}
        >
          Ujccap
        </Link>
        {authLinks}
      </div>
      {isNavOpen ? (
        <div className={styles.mobile_container}>
          <UserSearch />
        </div>
      ) : (
        ""
      )}
      <div className={`${styles.navbar_content_desktop}`}>
        <Link
          onClick={() => dispatch({ type: "RESET_STATE" })}
          to="/"
          className={styles.goHome}
        >
          Ujccap
        </Link>
        <UserSearch />
        {authLinks}
      </div>
    </nav>
  );
};

export default Navbar;

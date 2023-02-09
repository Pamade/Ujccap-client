import { useEffect, useState } from "react";
import styles from "./user-search.module.scss";
import { useHandleApiCall, CheckType } from "../../../hooks/useHandleApiCall";
import { debounce } from "lodash";
import { User } from "../../../types/types";
import SingleUserSearched from "./SingleUserSearched/SingleUserSearched";
import { useLocation } from "react-router-dom";
const UserSearch = () => {
  const { handleApiCall } = useHandleApiCall("GET", false);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [usersSearched, setUsersSearched] = useState<User[]>([]);
  const handleSearchUser = () => {
    handleApiCall(`/anyUser/search/${search}`, {}, {}, (data, err) => {
      console.log(data);
      const areUsers = CheckType<User[]>(data);
      if (areUsers && data.length !== 0) {
        setUsersSearched(data);
      } else {
        setUsersSearched([]);
      }
    });
  };

  useEffect(() => {
    const debouncedCall = debounce(handleSearchUser, 500);

    debouncedCall();

    return () => debouncedCall.cancel();
  }, [search]);
  useEffect(() => {
    setUsersSearched([]);
  }, [location]);
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Find user by email or seller name..."
      />
      {usersSearched && usersSearched.length !== 0 && (
        <div className={styles.results_box}>
          <ul>
            {usersSearched.map((user) => (
              <SingleUserSearched user={user} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearch;

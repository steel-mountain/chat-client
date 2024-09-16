import { memo, useState } from "react";
import logo from "../../images/icons/logo.svg";
import userphoto from "../../images/icons/user.svg";
import { IUsers } from "../../types/socket.types";

import styles from "./Sidebar.module.scss";

interface ISidebarProps {
  users: IUsers[];
}

const Sidebar: React.FC<ISidebarProps> = memo(({ users }) => {
  const [search, setSearch] = useState("");

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterUsers = users?.filter((user) =>
    user?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.container}>
          <img src={logo} alt="logo" />
          <span className={styles.name}>Chat Buddies</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search people"
            value={search}
            onChange={onChangeText}
          />
        </div>
      </div>
      <ul className={styles.items}>
        {search === ""
          ? users.map((user) => (
              <li className={styles.item} key={user.id}>
                <img className={styles.photoImg} src={userphoto} alt="avatar" />
                <p className={styles.photo}>{user.name}</p>
              </li>
            ))
          : filterUsers.map((user) => (
              <li className={styles.item} key={user.id}>
                <img className={styles.photoImg} src={userphoto} alt="avatar" />
                <p className={styles.photo}>{user.name}</p>
              </li>
            ))}
      </ul>
    </section>
  );
});

export default Sidebar;

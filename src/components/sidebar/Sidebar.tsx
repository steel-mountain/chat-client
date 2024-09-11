import logo from "../../images/logo.svg";
import user from "../../images/user.svg";

import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
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
          />
        </div>
      </div>
      <ul className={styles.items}>
        <li className={styles.item}>
          <img className={styles.photoImg} src={user} alt="photo" />
          <p className={styles.photo}>Lucas Williams</p>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;

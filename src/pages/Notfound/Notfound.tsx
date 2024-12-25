import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <button onClick={() => navigate("/")}>Go to main page</button>
    </div>
  );
};

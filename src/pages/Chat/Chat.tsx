import styles from "./Chat.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";

const Chat: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Sidebar />
      <Content />
    </section>
  );
};

export default Chat;

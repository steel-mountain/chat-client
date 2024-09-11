import { CSSProperties } from "react";
import styles from "./Message.module.scss";
import { IEmitMessage } from "../../types/socket.types";
import { getDate } from "../../services/getDate";
import { useLocation } from "react-router-dom";

interface MessageProps {
  msg: IEmitMessage;
}

const Message: React.FC<MessageProps> = ({ msg }) => {
  const { search } = useLocation();
  const { name: user } = Object.fromEntries(new URLSearchParams(search));
  const { name, message } = msg;

  const isUser = user === name;
  const dir: CSSProperties = isUser
    ? { textAlign: "right" }
    : { textAlign: "left" };

  return (
    <div className={styles.chatContainer}>
      <p className={styles.name} style={dir}>
        {name}
      </p>
      <div className={`${styles.message} ${isUser ? styles.messageRight : ""}`}>
        <div>
          {message}
          <div className={styles.time}>{getDate()}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;

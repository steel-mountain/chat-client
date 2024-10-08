import { CSSProperties, memo } from "react";
import styles from "./Message.module.scss";
import { IGetMessage } from "../../types/socket.types";
import { getDate } from "../../services/getDate";
import { useLocation } from "react-router-dom";
import { SERVER } from "../../consts";

interface MessageProps {
  msg: IGetMessage;
}

const Message: React.FC<MessageProps> = memo(({ msg }) => {
  const { search } = useLocation();
  const { name: user } = Object.fromEntries(new URLSearchParams(search));
  const { name, message, url } = msg;

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
          <span>{message}</span>
          {url && (
            <img
              className={styles.img}
              src={`${SERVER}${url.slice(1)}`}
              alt="Uploaded file"
            />
          )}
          <div className={styles.time}>{getDate()}</div>
        </div>
      </div>
    </div>
  );
});

export default Message;

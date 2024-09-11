import styles from "./Message.module.scss";

interface MessageProps {
  text: string;
  isUser: boolean;
  time: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, time }) => {
  return (
    <div className={styles.chatContainer}>
      <div className={`${styles.message} ${isUser ? styles.messageRight : ""}`}>
        <div>
          {text}
          <div className={styles.time}>{time}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;

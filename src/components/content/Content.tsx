import styles from "./Content.module.scss";
import smile from "../../images/smile.svg";
import send from "../../images/send.svg";
import { useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import { IEmitMessage } from "../../types/socket.types";

interface IContentProps {
  messages: IEmitMessage[];
}

const Content: React.FC<IContentProps> = ({ messages }) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.name}>Jake</div>
        <div className={styles.logout}>Leave chat</div>
      </div>
      <div className={styles.content}>
        {messages.map((msg, i) => {
          return <Message key={i} msg={msg} />;
        })}
      </div>
      <div className={styles.typing}>
        <img src={smile} alt="emoji" />
        <textarea
          ref={textareaRef}
          rows={1}
          className={styles.inputMessage}
          placeholder="Type message..."
          value={text}
          onChange={onChangeText}
        />
        <button type="submit" className={styles.btn}>
          <span>Send</span>
          <img src={send} alt="send message" />
        </button>
      </div>
    </section>
  );
};

export default Content;

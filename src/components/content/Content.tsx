import styles from "./Content.module.scss";
import smile from "../../images/smile.svg";
import send from "../../images/send.svg";
import { useEffect, useRef, useState } from "react";
import Message from "../message/Message";

const Content: React.FC = () => {
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
        <Message text="HellO!" isUser={true} time="19:15" />
        <Message text="Bye!" isUser={false} time="19:15" />
        <Message
          text="Byeсайт, сочетающий черты социальной сети и форума, на котором зарегистрированные пользователи могут размещать ссылки на какую-либо понравившуюся информацию в интернете и обсуждать её[7]. Как и многие другие подобные сайты, Reddit поддерживает систему голосования за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={false}
          time="19:15"
        />
        <Message
          text="Byeсайт, сочетающий червания за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={false}
          time="19:15"
        />
        <Message
          text="Byeсайт, сочетающий черты социальной сети и форума, на котором зарегистрированные пользователи могут размещать ссылки на какую-либо понравившуюся информацию в интернете и обсуждать её[7]. Как и многие другие подобные сайты, Reddit поддерживает систему голосования за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={true}
          time="19:15"
        />
        <Message
          text="Byeсайт, сочетающий червания за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={true}
          time="19:15"
        />
        <Message
          text="Byeсайт, сочетающий черты социальной сети и форума, на котором зарегистрированные пользователи могут размещать ссылки на какую-либо понравившуюся информацию в интернете и обсуждать её[7]. Как и многие другие подобные сайты, Reddit поддерживает систему голосования за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={false}
          time="19:15"
        />
        <Message
          text="Byeсайт, сочетающий червания за понравившиеся сообщения — наиболее популярные из них оказываются на заглавной страниц"
          isUser={true}
          time="19:15"
        />
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

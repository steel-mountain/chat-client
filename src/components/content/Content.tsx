import styles from "./Content.module.scss";
import smile from "../../images/smile.svg";
import send from "../../images/send.svg";
import { useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import { IEmitMessage, IFormData, SocketType } from "../../types/socket.types";
import { useNavigate } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface IContentProps {
  messages: IEmitMessage[];
  params: IFormData;
  socket: SocketType;
}

const Content: React.FC<IContentProps> = ({ messages, params, socket }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isOpen, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (window.confirm("Вы действительно хотите выйти?")) {
      socket.emit("logout", params);
      navigate("/");
    }
  };

  const onSubmit = () => {
    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      socket.emit("sendMessage", { message, params });
      setMessage("");
    }
  };

  const handleEmoji = (e: EmojiClickData) => {
    setMessage(`${message} ${e.emoji}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.name}>{params.room} room</div>
        <button onClick={handleLogout} className={styles.logout}>
          Leave chat
        </button>
      </div>
      <div className={styles.content}>
        {messages.map((msg, i) => {
          return <Message key={i} msg={msg} />;
        })}
      </div>
      {isOpen && (
        <span className={styles.emojiBlock} ref={emojiRef}>
          <EmojiPicker onEmojiClick={handleEmoji} />
        </span>
      )}
      <form className={styles.typing} onSubmit={onSubmit}>
        <img
          onClick={() => setOpen(!isOpen)}
          className={styles.emoji}
          src={smile}
          alt="emoji"
        />
        <textarea
          ref={textareaRef}
          rows={1}
          className={styles.inputMessage}
          placeholder="Type message..."
          value={message}
          onChange={onChangeText}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className={styles.btn}>
          <span>Send</span>
          <img src={send} alt="send message" />
        </button>
      </form>
    </section>
  );
};

export default Content;

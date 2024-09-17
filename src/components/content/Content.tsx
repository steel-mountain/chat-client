import styles from "./Content.module.scss";
import smile from "../../images/icons/smile.svg";
import send from "../../images/icons/send.svg";
import paperclip from "../../images/icons/paperclip.svg";
import { memo, useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import { IFormData, IGetMessage, SocketType } from "../../types/socket.types";
import { useNavigate } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Menu from "../menu/Menu";
import Modal from "../modal/Modal";
import { useClickOutside } from "../../services/hooks/useOutsideClick";

interface IContentProps {
  messages: IGetMessage[];
  params: IFormData;
  socket: SocketType;
}

const Content: React.FC<IContentProps> = memo(
  ({ messages, params, socket }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("");
    const [isOpenEmoji, setOpenEmoji] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);
    const [isOpenModal, setOpenModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiRef = useRef<HTMLSpanElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside({ ref: emojiRef, setOpen: setOpenEmoji });
    useClickOutside({ ref: menuRef, setOpen: setOpenMenu });

    useEffect(() => {
      textareaRef.current?.focus();

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [message]);

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

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message !== "") {
        socket.emit("sendMessage", { message, params });
        setMessage("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (message !== "") {
          socket.emit("sendMessage", { message, params });
          setMessage("");
        }
      }
    };

    const handleEmoji = (e: EmojiClickData) => {
      setMessage((msg) => `${msg} ${e.emoji}`);
    };

    const handleSendFile = (message: string) => {
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const buffer = reader.result as ArrayBuffer;
          socket.emit("sendMessage", {
            fileName: file.name,
            dataBuffer: buffer,
            message,
            params,
          });
          setMessage("");
        };
        setOpenModal(false);
        reader.readAsArrayBuffer(file);
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
        <form className={styles.typing} onSubmit={onSubmit}>
          {isOpenEmoji && (
            <span className={styles.emojiBlock} ref={emojiRef}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </span>
          )}
          <img
            onClick={() => setOpenEmoji(!isOpenEmoji)}
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
          <div className={styles.menuBlock} ref={menuRef}>
            {isOpenMenu && (
              <Menu
                setFile={setFile}
                setOpenModal={setOpenModal}
                setOpenMenu={setOpenMenu}
              />
            )}
            <img
              className={styles.paperclip}
              src={paperclip}
              onClick={() => setOpenMenu(!isOpenMenu)}
              alt="paperclip"
            />
          </div>
          <button type="submit" className={styles.btn}>
            <span>Send</span>
            <img src={send} alt="send message" />
          </button>
        </form>
        {isOpenModal && file && (
          <Modal
            file={file}
            onClose={() => setOpenModal(false)}
            onSend={handleSendFile}
            message={message}
          />
        )}
      </section>
    );
  }
);

export default Content;

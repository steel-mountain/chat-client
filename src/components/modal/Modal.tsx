import styles from "./Modal.module.scss";
import { memo, useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useClickOutside } from "../../services/hooks/useOutsideClick";
import smile from "../../images/icons/smile.svg";

interface IModalProps {
  file: File | null;
  onClose: () => void;
  onSend: (message: string) => void;
  message: string;
}

const Modal: React.FC<IModalProps> = memo(
  ({ file, onClose, onSend, message }) => {
    const [msg, setMsg] = useState(message);
    const [isOpen, setOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiRef = useRef<HTMLSpanElement>(null);

    useClickOutside({ ref: emojiRef, setOpen });

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [msg]);

    useEffect(() => {
      textareaRef.current?.focus();
    }, []);

    const handleSend = () => {
      if (file) {
        onSend(msg);
      }
    };

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSend();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    };

    const handleEmoji = (e: EmojiClickData) => {
      setMsg((msg) => `${msg} ${e.emoji}`);
    };

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.container}>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Selected"
                className={styles.modalImage}
              />
            )}
          </div>
          <form className={styles.form} onSubmit={onSubmit}>
            {isOpen && (
              <span className={styles.emojiBlock} ref={emojiRef}>
                <EmojiPicker onEmojiClick={handleEmoji} />
              </span>
            )}
            <div className={styles.formContainer}>
              <img
                onClick={() => setOpen(!isOpen)}
                className={styles.emoji}
                src={smile}
                alt="emoji"
              />
              <textarea
                ref={textareaRef}
                rows={3}
                className={styles.inputMessage}
                placeholder="Type message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button onClick={handleSend} className={styles.sendButton}>
              Send
            </button>
            <button onClick={onClose} className={styles.closeButton}>
              Close
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default Modal;

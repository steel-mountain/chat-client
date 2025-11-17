import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Message } from "../message/Message"
import {
  LoginFormData,
  GetMessage,
  SocketType,
} from "../../shared/types/socket.types"
import { useNavigate } from "react-router-dom"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { Menu } from "../menu/Menu"
import { Modal } from "../modal/Modal"
import { useClickOutside } from "../../shared/services/hooks/useOutsideClick"
import { useTypingStatus } from "../../shared/services/hooks/useTypingStatus"
import { useTheme } from "../../shared/theme/useTheme"
import { USER_INFO_STORAGE } from "../../shared/constants/constants"
import styles from "./styles.module.scss"
import smile from "../../shared/images/icons/smile.svg"
import send from "../../shared/images/icons/send.svg"
import paperclip from "../../shared/images/icons/paperclip.svg"
import logout from "../../shared/images/icons/logout.svg"
import lightMode from "../../shared/images/icons/light-mode.svg"
import darkMode from "../../shared/images/icons/dark-mode.svg"

interface ContentProps {
  messages: GetMessage[]
  params: LoginFormData
  socket: SocketType
}

export const Content: FC<ContentProps> = memo((props) => {
  const { messages, params, socket } = props

  const [message, setMessage] = useState<string>("")
  const [isOpenEmoji, setOpenEmoji] = useState(false)
  const [isOpenMenu, setOpenMenu] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const { theme, toggleTheme } = useTheme()

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const emojiRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  useClickOutside({ ref: emojiRef, setOpen: setOpenEmoji })
  useClickOutside({ ref: menuRef, setOpen: setOpenMenu })
  useTypingStatus({ socket, params, message })

  useEffect(() => {
    textareaRef.current?.focus()

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value)
    },
    [],
  )

  const handleLogout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (window.confirm("Вы действительно хотите выйти?")) {
        socket.emit("logout", params)
        sessionStorage.removeItem(USER_INFO_STORAGE)
        navigate("/")
      }
    },
    [params, navigate, socket],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (message !== "") {
        socket.emit("sendMessage", { message, params })
        setMessage("")
      }
    },
    [message, params, socket],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    },
    [handleSubmit],
  )

  const handleEmojiSelect = useCallback((e: EmojiClickData) => {
    setMessage((msg) => `${msg} ${e.emoji}`)
  }, [])

  const handleSendFile = useCallback(
    (message: string) => {
      if (file) {
        const reader = new FileReader()

        reader.onload = () => {
          const buffer = reader.result as ArrayBuffer
          socket.emit("sendMessage", {
            fileName: file.name,
            dataBuffer: buffer,
            message,
            params,
          })
          setMessage("")
        }
        setOpenModal(false)
        reader.readAsArrayBuffer(file)
      }
    },
    [file, params, socket],
  )

  const headerButtons = useMemo(
    () => (
      <>
        <button className={styles.btnHeader} onClick={toggleTheme}>
          <img
            src={theme === "light" ? darkMode : lightMode}
            alt="mode"
            title="Change theme"
          />
        </button>
        <button className={styles.btnHeader} onClick={handleLogout}>
          <img src={logout} alt="logout" title="Log out" />
        </button>
      </>
    ),
    [handleLogout, theme, toggleTheme],
  )

  const messageList = useMemo(
    () => messages.map((msg, i) => <Message key={i} msg={msg} />),
    [messages],
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.name}>{params.room} room</div>
        <div>{headerButtons}</div>
      </div>
      <div className={styles.content}>{messageList}</div>
      <form className={styles.typing} onSubmit={handleSubmit}>
        {isOpenEmoji && (
          <span className={styles.emojiBlock} ref={emojiRef}>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </span>
        )}
        <img
          onClick={() => setOpenEmoji((prev) => !prev)}
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
          onChange={handleChangeText}
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
            onClick={() => setOpenMenu((prev) => !prev)}
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
  )
})

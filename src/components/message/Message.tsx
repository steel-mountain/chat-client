import { CSSProperties, FC, memo } from "react"
import { GetMessage } from "../../shared/types/socket.types"
import { getDate } from "../../shared/services/getDate"
import { useLocation } from "react-router-dom"
import { SERVER } from "../../shared/constants/constants"
import styles from "./styles.module.scss"

interface MessageProps {
  msg: GetMessage
}

export const Message: FC<MessageProps> = memo(({ msg }) => {
  const { search } = useLocation()
  const { name: user } = Object.fromEntries(new URLSearchParams(search))
  const { name, message, url } = msg

  const isUser = user === name
  const dir: CSSProperties = isUser
    ? { textAlign: "right" }
    : { textAlign: "left" }

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
  )
})

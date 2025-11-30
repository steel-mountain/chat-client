import { CSSProperties, FC } from "react"
import { useLocation } from "react-router-dom"
import { SERVER } from "../../shared/constants"
import { getDate } from "../../shared/services/getDate"
import { GetMessageType } from "../../shared/types"
import styles from "./styles.module.scss"

interface MessageProps {
  msg: GetMessageType
}

export const Message: FC<MessageProps> = ({ msg }) => {
  const { search } = useLocation()
  const { name: user } = Object.fromEntries(new URLSearchParams(search))
  const { name, message, url } = msg

  const isCurrentUser = user === name
  const dir: CSSProperties = isCurrentUser ? { textAlign: "right" } : { textAlign: "left" }

  return (
    <div className={styles.chatContainer}>
      <p className={styles.name} style={dir}>
        {name}
      </p>
      <div className={`${styles.message} ${isCurrentUser ? styles.messageRight : ""}`}>
        <div>
          <span>{message}</span>
          {url && <img className={styles.img} src={`${SERVER}${url.slice(1)}`} alt="Uploaded file" />}
          <div className={styles.time}>{getDate()}</div>
        </div>
      </div>
    </div>
  )
}

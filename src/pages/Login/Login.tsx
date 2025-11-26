import clsx from "clsx"
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { USER_INFO_STORAGE } from "../../shared/constants"
import { getTrimStr } from "../../shared/services/getTrimStr"
import { LoginFormData, SocketType } from "../../shared/types"
import styles from "./styles.module.scss"

interface LoginProps {
  socket: SocketType
}

export const Login: FC<LoginProps> = ({ socket }) => {
  const navigate = useNavigate()

  const [data, setData] = useState<LoginFormData>({
    name: "",
    room: "",
  })
  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = data.name.trim()
    const room = data.room.trim()

    socket.emit("checkName", { name, room }, (isUnique: boolean) => {
      if (isUnique) {
        navigate(`/chat?name=${getTrimStr(name)}&room=${getTrimStr(room)}`)
        sessionStorage.setItem(
          USER_INFO_STORAGE,
          JSON.stringify({ name, room }),
        )
      } else {
        alert("Nickname is already used, please choose another name")
      }
    })
  }

  const disable = Object.values(data).includes("")

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Chatting rooms</h1>
        <input
          name="name"
          className={styles.input}
          placeholder="Name"
          type="text"
          onChange={onChangeForm}
          value={data.name}
          required
        />
        <input
          name="room"
          className={styles.input}
          placeholder="Chat room"
          type="text"
          onChange={onChangeForm}
          value={data.room}
          required
        />
        <button
          className={clsx(styles.btn, { [styles["btn--active"]]: !disable })}
          type="submit"
          disabled={disable}
        >
          Join and chat
        </button>
      </form>
    </section>
  )
}

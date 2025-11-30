import { FC, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Content, Sidebar } from "../../components"
import { USER_INFO_STORAGE } from "../../shared/constants"
import { GetMessageType, GetStatusMessageType, LoginFormType, SocketType, UsersType } from "../../shared/types"
import styles from "./styles.module.scss"

interface ChatProps {
  socket: SocketType
}

export const Chat: FC<ChatProps> = ({ socket }) => {
  const [params, setParams] = useState<LoginFormType>({ name: "", room: "" })
  const [messages, setMessages] = useState<GetMessageType[]>([])
  const [users, setUsers] = useState<UsersType[]>([])
  const [statusMessage, setStatusMessage] = useState<GetStatusMessageType>({
    name: "",
    status: false,
  })

  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = Object.fromEntries(new URLSearchParams(search))

    const storedUser = sessionStorage.getItem(USER_INFO_STORAGE)
    const user = storedUser ? (JSON.parse(storedUser) as LoginFormType) : null

    if (!user?.name || !user?.room) {
      navigate("/")
      return
    }

    navigate(`/chat?name=${queryParams.name}&room=${queryParams.room}`, {
      replace: true,
    })

    setParams((prev) => ({ ...prev, ...user }))
    socket.emit("join", user)
  }, [search, socket, navigate])

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((msg) => [...msg, data])
    })
    socket.on("users", (data) => {
      setUsers(data)
    })
    socket.on("typing", ({ name, status }) => {
      setStatusMessage({ name, status })
    })
    return () => {
      socket.off("message")
      socket.off("users")
      socket.off("typing")
    }
  }, [])

  return (
    <section className={styles.wrapper}>
      <Sidebar users={users} statusMessage={statusMessage} />
      <Content messages={messages} params={params} socket={socket} />
    </section>
  )
}

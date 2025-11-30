import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from "react"
import logo from "../../shared/images/icons/logo.svg"
import userphoto from "../../shared/images/icons/user.svg"
import { GetStatusMessage, Users } from "../../shared/types"
import styles from "./styles.module.scss"

interface SidebarProps {
  users: Users[]
  statusMessage: GetStatusMessage
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
  const { users, statusMessage } = props
  const [search, setSearch] = useState("")

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const filterUsers = useMemo(() => {
    if (!users) return []

    return users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
  }, [users, search])

  const displayedUsers = search ? filterUsers : users

  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.container}>
          <img src={logo} alt="logo" />
          <span className={styles.name}>Chat Buddies</span>
        </div>
        <div className={styles.inputWrapper}>
          <input className={styles.input} type="text" placeholder="Search people" value={search} onChange={onChangeText} />
        </div>
      </div>
      <ul className={styles.items}>
        {displayedUsers.map((user) => (
          <li className={styles.item} key={user.id}>
            <img className={styles.photoImg} src={userphoto} alt="avatar" />
            <div className={styles.description}>
              <p className={styles.photo}>{user.name}</p>
              {statusMessage.name === user.name && statusMessage.status && <span>Typing...</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
})

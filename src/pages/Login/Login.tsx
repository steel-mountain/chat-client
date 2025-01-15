import { useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import { LoginFormData, SocketType } from "../../shared/types/socket.types";
import { getTrimStr } from "../../shared/services/getTrimStr";
import { USER_INFO_STORAGE } from "../../shared/constants/constants";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface LoginProps {
  socket: SocketType;
}

export const Login: FC<LoginProps> = ({ socket }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<LoginFormData>({
    name: "",
    room: "",
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  const onChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    },
    [data]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("checkName", data, (isUnique: boolean) => {
      if (isUnique) {
        navigate(
          `/chat?name=${getTrimStr(data.name)}&room=${getTrimStr(data.room)}`
        );
        sessionStorage.setItem(
          USER_INFO_STORAGE,
          JSON.stringify({
            name: getTrimStr(data.name),
            room: getTrimStr(data.room),
          })
        );
      } else {
        alert("Nickname is already used, please choose another name");
      }
    });
  };

  const disable = Object.values(data).includes("");

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
        <button onClick={() => setError(true)}>Error!!!</button>
      </form>
    </section>
  );
};

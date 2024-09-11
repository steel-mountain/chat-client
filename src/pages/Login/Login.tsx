import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { useState } from "react";

interface IFormData {
  name: string;
  room: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IFormData>({
    name: "",
    room: "",
  });

  const disable = Object.values(data).includes("");

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/chat?name=${data.name}&room=${data.room}`);
  };

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
        />
        <input
          name="room"
          className={styles.input}
          placeholder="Chat room"
          type="text"
          onChange={onChangeForm}
          value={data.room}
        />
        <button className={styles.btn} type="submit" disabled={disable}>
          Join and chat
        </button>
      </form>
    </section>
  );
};

export default Login;

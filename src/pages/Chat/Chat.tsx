import styles from "./Chat.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IFormData,
  ISocket,
  IUsers,
  IGetMessage,
} from "../../types/socket.types";

const Chat: React.FC<ISocket> = ({ socket }) => {
  const [params, setParams] = useState<IFormData>({ name: "", room: "" });
  const [messages, setMessages] = useState<IGetMessage[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = Object.fromEntries(new URLSearchParams(search));
    setParams({ ...params, name, room });
    socket.emit("join", { name, room });
  }, [search]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((msg) => [...msg, data]);
    });
    socket.on("users", (data) => {
      setUsers(data);
    });
    return () => {
      socket.off("message");
      socket.off("users");
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <Sidebar users={users} />
      <Content messages={messages} params={params} socket={socket} />
    </section>
  );
};

export default Chat;

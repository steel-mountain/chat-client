import styles from "./Chat.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IFormData,
  IEmitMessage,
  ISocketProps,
} from "../../types/socket.types";

const Chat: React.FC<ISocketProps> = ({ socket }) => {
  const [params, setParams] = useState<IFormData>();
  const [messages, setMessages] = useState<IEmitMessage[]>([]);
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = Object.fromEntries(new URLSearchParams(search));
    setParams({ ...params, name, room });
    socket.emit("join", { name, room });
  }, [search]);

  useEffect(() => {
    socket.on("message", (data: IEmitMessage) => {
      setMessages((msg) => [...msg, data]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <Sidebar />
      <Content messages={messages} />
    </section>
  );
};

export default Chat;

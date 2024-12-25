import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import {
  LoginFormData,
  Users,
  GetMessage,
  GetStatusMessage,
  SocketType,
} from "../../shared/types/socket.types";
import { Content, Sidebar } from "../../components";
import styles from "./styles.module.scss";

interface ChatProps {
  socket: SocketType;
}

export const Chat: FC<ChatProps> = ({ socket }) => {
  const [params, setParams] = useState<LoginFormData>({ name: "", room: "" });
  const [messages, setMessages] = useState<GetMessage[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [statusMessage, setStatusMessage] = useState<GetStatusMessage>({
    name: "",
    status: false,
  });
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = Object.fromEntries(
      new URLSearchParams(search)
    ) as Record<"name" | "room", string>;

    if (!name || !room) return;
    setParams({ ...params, name, room });
    socket.emit("join", { name, room });
  }, [search, params, socket]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((msg) => [...msg, data]);
    });
    socket.on("users", (data) => {
      setUsers(data);
    });
    socket.on("typing", ({ name, status }) => {
      setStatusMessage({ name, status });
    });
    return () => {
      socket.off("message");
      socket.off("users");
      socket.off("typing");
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <Sidebar users={users} statusMessage={statusMessage} />
      <Content messages={messages} params={params} socket={socket} />
    </section>
  );
};

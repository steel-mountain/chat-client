import { useLocation, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import {
  LoginFormData,
  Users,
  GetMessage,
  GetStatusMessage,
  SocketType,
} from "../../shared/types/socket.types";
import { Content, Sidebar } from "../../components";
import { USER_INFO_STORAGE } from "../../shared/constants/constants";
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
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = Object.fromEntries(
      new URLSearchParams(search)
    ) as Record<"name" | "room", string>;

    const user = JSON.parse(
      sessionStorage.getItem(USER_INFO_STORAGE) as string
    ) as LoginFormData;

    if (user === null) {
      navigate("/");
      return;
    }

    if (JSON.stringify(queryParams) !== JSON.stringify(user)) {
      navigate(`/chat?name=${user.name}&room=${user.room}`);
      return;
    }

    setParams({ ...params, ...user });
    socket.emit("join", { ...user });
  }, [search, socket]);

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
  }, [socket]);

  return (
    <section className={styles.wrapper}>
      <Sidebar users={users} statusMessage={statusMessage} />
      <Content messages={messages} params={params} socket={socket} />
    </section>
  );
};

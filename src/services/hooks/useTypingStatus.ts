import { useState, useEffect } from "react";
import { SocketType } from "../../types/socket.types";

interface IUseTypingStatus {
  socket: SocketType;
  params: {
    room: string;
    name: string;
  };
  message: string;
}

export const useTypingStatus = ({
  socket,
  params,
  message,
}: IUseTypingStatus) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (message !== "" && !isTyping) {
      setIsTyping(true);
      socket.emit("typing", { ...params, status: true });
    }

    const timeoutId = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        socket.emit("typing", { ...params, status: false });
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [message, isTyping, socket, params]);

  return isTyping;
};

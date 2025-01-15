import { Routes, Route } from "react-router-dom";
import { ChatAsync as Chat } from "./Chat/ChatAsync";
import { LoginAsync as Login } from "./Login/LoginAsync";
import { io } from "socket.io-client";
import { SocketType } from "../shared/types/socket.types";
import { SERVER } from "../shared/constants/constants";
import { Suspense } from "react";
import { Loader } from "../components";
import { Notfound } from "./Notfound/Notfound";

const socket: SocketType = io(SERVER);

export const Pages = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

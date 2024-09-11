import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/socket.types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000/"
);

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login socket={socket} />} />
      <Route path="/chat" element={<Chat socket={socket} />} />
    </Routes>
  );
};

export default Pages;

{
  /* <Routes>
<Route path="/" element={<Login />} />
<Route path="/auth/register" element={<Register />} />

<Route element={<Layout />}>
  <Route path="/home" element={<Home />} />
  <Route path="/job" element={<Job />} />
</Route>
</Routes> */
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import { SocketType } from "../types/socket.types";
import { SERVER } from "../consts";

const socket: SocketType = io(SERVER);

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

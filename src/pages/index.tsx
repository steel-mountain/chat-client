import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
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

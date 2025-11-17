import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { io } from "socket.io-client"
import { Loader } from "../components"
import { SERVER } from "../shared/constants/constants"
import { SocketType } from "../shared/types/socket.types"
import { ChatAsync as Chat } from "./Chat/ChatAsync"
import { LoginAsync as Login } from "./Login/LoginAsync"
import { Notfound } from "./Notfound/Notfound"

const socket: SocketType = io(SERVER)

export const Pages = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  )
}

import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Loader } from "../components"
import { socket } from "../shared/api"
import { ChatAsync as Chat } from "./Chat/ChatAsync"
import { LoginAsync as Login } from "./Login/LoginAsync"
import { Notfound } from "./Notfound/Notfound"

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

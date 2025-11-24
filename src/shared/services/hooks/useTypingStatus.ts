import { useEffect, useRef } from "react"
import { SocketType } from "../../types/socket.types"

interface UseTypingStatusType {
  socket: SocketType
  params: {
    room: string
    name: string
  }
  message: string
}

export const useTypingStatus = (props: UseTypingStatusType) => {
  const { socket, params, message } = props

  const isTypingRef = useRef(false)

  useEffect(() => {
    const status = message !== ""

    if (status !== isTypingRef.current) {
      socket.emit("typing", { ...params, status })
      isTypingRef.current = status
    }
  }, [message, socket, params])
}

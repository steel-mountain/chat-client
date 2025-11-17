import { io } from "socket.io-client"
import { SERVER } from "../constants/constants"

export const socket = io(SERVER)

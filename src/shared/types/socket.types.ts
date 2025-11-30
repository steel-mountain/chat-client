import { Socket } from "socket.io-client"

export interface LoginFormData {
  name: string
  room: string
}

export interface Users extends LoginFormData {
  id: string
}

export interface EmitMessage {
  name: string
  message: string
}

export interface SendMessage {
  params: LoginFormData
  message?: string
  fileName?: string
  dataBuffer?: ArrayBuffer
}

export interface GetMessage {
  name: string
  message?: string
  url?: string
}

export interface StatusMessage extends LoginFormData {
  status: boolean
}

export interface GetStatusMessage {
  name: string
  status: boolean
}

export interface ServerToClientEvents {
  message: (data: GetMessage) => void
  users: (data: Users[]) => void
  typing: (data: StatusMessage) => void
}

export interface ClientToServerEvents {
  join: (data: LoginFormData) => void
  checkName: (data: LoginFormData, callback: (isUnique: boolean) => void) => void
  logout: (data: LoginFormData) => void
  sendMessage: (data: SendMessage) => void
  typing: (data: StatusMessage) => void
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>

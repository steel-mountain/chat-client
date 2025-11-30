import { Socket } from "socket.io-client"

export interface LoginFormType {
  name: string
  room: string
}

export interface UsersType extends LoginFormType {
  id: string
}

interface SendMessageType {
  params: LoginFormType
  message?: string
  fileName?: string
  dataBuffer?: ArrayBuffer
}

export interface GetMessageType {
  name: string
  message?: string
  url?: string
}

interface StatusMessageType extends LoginFormType {
  status: boolean
}

export interface GetStatusMessageType {
  name: string
  status: boolean
}

interface ServerToClientEventsType {
  message: (data: GetMessageType) => void
  users: (data: UsersType[]) => void
  typing: (data: StatusMessageType) => void
}

interface ClientToServerEventsType {
  join: (data: LoginFormType) => void
  checkName: (data: LoginFormType, callback: (isUnique: boolean) => void) => void
  logout: (data: LoginFormType) => void
  sendMessage: (data: SendMessageType) => void
  typing: (data: StatusMessageType) => void
}

export type SocketType = Socket<ServerToClientEventsType, ClientToServerEventsType>

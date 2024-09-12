import { Socket } from "socket.io-client";

export interface IFormData {
  name: string;
  room: string;
}

export interface IUsers {
  name: string;
  room: string;
  id: string;
}

export interface IEmitMessage {
  name: string;
  message: string;
}

export interface ISendMessage {
  params: IFormData;
  message: string;
}

export interface ServerToClientEvents {
  message: (data: IEmitMessage) => void;
  users: (users: IUsers[]) => void;
}

export interface ClientToServerEvents {
  join: (data: IFormData) => void;
  checkName: (data: IFormData, callback: (isUnique: boolean) => void) => void;
  logout: (data: IFormData) => void;
  sendMessage: (data: ISendMessage) => void;
}

export interface ISocket {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

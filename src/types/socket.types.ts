import { Socket } from "socket.io-client";

export interface IFormData {
  name: string;
  room: string;
}

export interface IUsers extends IFormData {
  id: string;
}

export interface IEmitMessage {
  name: string;
  message: string;
}

export interface ISendMessage {
  params: IFormData;
  message?: string;
  fileName?: string;
  dataBuffer?: ArrayBuffer;
}

export interface IGetMessage {
  name: string;
  message?: string;
  url?: string;
}

export interface IStatusMessage extends IFormData {
  status: boolean;
}

export interface IGetStatusMessage {
  name: string;
  status: boolean;
}

export interface ServerToClientEvents {
  message: (data: IGetMessage) => void;
  users: (data: IUsers[]) => void;
  typing: (data: IStatusMessage) => void;
}

export interface ClientToServerEvents {
  join: (data: IFormData) => void;
  checkName: (data: IFormData, callback: (isUnique: boolean) => void) => void;
  logout: (data: IFormData) => void;
  sendMessage: (data: ISendMessage) => void;
  typing: (data: IStatusMessage) => void;
}

export interface ISocket {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

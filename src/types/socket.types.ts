import { Socket } from "socket.io-client";

export interface IFormData {
  name: string;
  room: string;
}

export interface IEmitMessage {
  name: string;
  message: string;
}

export interface ServerToClientEvents {
  message: (data: IEmitMessage) => void;
}

export interface ClientToServerEvents {
  join: (data: IFormData) => void;
  checkName: (data: IFormData, callback: (isUnique: boolean) => void) => void;
}

export interface ISocketProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

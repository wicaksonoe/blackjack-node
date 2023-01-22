import { Server, Socket } from "socket.io";

export function JoinChannel(socket: Socket, channel: string) {
  socket.join(channel);
}

export function BroadcastToChannel<T = any>(
  io: Server,
  channel: string,
  event: string,
  data: T
) {
  io.to(channel).emit(event, data);
}

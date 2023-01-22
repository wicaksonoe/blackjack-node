import { NextApiResponseWithSocket } from "interfaces/websocket";
import { NextApiRequest } from "next";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import JoinRoom from "services/joinRoom";
import PlayerInformation from "interfaces/playerInformation";
import JoinRoomRequest from "interfaces/room/joinRoomRequest";

export default function handler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket.server);

    const pubClient = new Redis(
      `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    );
    const subClient = pubClient.duplicate();

    io.adapter(createAdapter(pubClient, subClient));

    // setup events
    io.on("connection", (socket) => {
      socket.on("joinRoom", async (payload: JoinRoomRequest) => {
        await JoinRoom(io, socket, payload.roomId, {
          id: payload.playerId,
          name: payload.playerName,
          chip: payload.playerChip,
        } as PlayerInformation);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}

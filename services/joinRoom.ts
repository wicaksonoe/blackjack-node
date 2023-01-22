import PlayerInformation from "interfaces/playerInformation";
import RoomInformation from "interfaces/roomInformation";
import Redis from "ioredis";
import { Server, Socket } from "socket.io";
import _ from "underscore";
import { BroadcastToChannel } from "utils/socket";

export default async function JoinRoom(
  io: Server,
  socket: Socket,
  id: string,
  player: PlayerInformation
): Promise<RoomInformation | undefined> {
  const redis = new Redis(
    `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  );

  // get room information
  let roomInformation = await redis.get(`room:${id}`).then((res) => {
    if (res === null) {
      return undefined;
    } else {
      return JSON.parse(res) as RoomInformation;
    }
  });

  // return undefined when room doesn't exist on database
  if (_.isEmpty(roomInformation)) {
    return undefined;
  }

  // join room channel
  socket.join(`room:${roomInformation?.id}`);

  // check if player already join the room
  let existingPlayer = roomInformation?.players.find((e) => e.id === player.id);
  if (!_.isEmpty(existingPlayer)) {
    return roomInformation;
  }

  // add new player to the room
  let newPlayer = { ...player };
  newPlayer.tableNumber = (roomInformation?.players.length ?? 0) + 1;
  roomInformation?.players.push(newPlayer);

  // update room information
  await redis.set(
    `room:${roomInformation?.id}`,
    JSON.stringify(roomInformation)
  );

  // emit room information to the channel
  BroadcastToChannel(
    io,
    `room:${roomInformation?.id}`,
    "playerJoined",
    roomInformation
  );
}

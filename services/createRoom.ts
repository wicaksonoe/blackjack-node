import RoomInformation from "interfaces/roomInformation";
import Redis from "ioredis";
import moment from "moment";
import * as Short from "short-uuid";

interface CreateRoomRequest {
  name: string;
}

export default async function CreateRoom(
  payload: CreateRoomRequest
): Promise<RoomInformation> {
  const redis = new Redis(
    `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  );

  const expireTime = moment().utc().add(2, "hours");

  const roomId = Short.generate();
  const roomInformation: RoomInformation = {
    id: roomId,
    name: payload.name,
    url: `${process.env.BASE_URL}/room/${roomId}`,
    expireTime: expireTime.unix(),
    players: [],
  };

  await redis.set(`room:${roomId}`, JSON.stringify(roomInformation));
  await redis.expireat(`room:${roomId}`, expireTime.unix());
  await redis.quit();

  return roomInformation;
}

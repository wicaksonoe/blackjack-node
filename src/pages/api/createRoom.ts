import BaseError from "@/interfaces/baseError";
import RoomInformation from "@/interfaces/roomInformation";
import { Redis } from "ioredis";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Short from "short-uuid";

interface CreateRoomRequest {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomInformation | BaseError>
) {
  const body = req.body as CreateRoomRequest;

  if (req.method === "POST") {
    if (typeof body.name === "undefined") {
      return res.status(400).send({ message: "Field name is required." });
    }

    // TODO: move initialization redis to utils
    const redis = new Redis(
      `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    );

    const expireTime = moment().utc().add(2, "hours");

    const roomId = Short.generate();
    const roomInformation: RoomInformation = {
      id: roomId,
      name: body.name,
      url: `${process.env.BASE_URL}/room/${roomId}`,
      expireTime: expireTime.unix(),
      players: [],
    };

    redis.hset(`room:${roomId}`, roomInformation);
    redis.expireat(`room:${roomId}`, expireTime.unix());

    res.status(200).json(roomInformation);
  } else {
    res.status(405).send({ message: "Method not allowed." });
  }
}

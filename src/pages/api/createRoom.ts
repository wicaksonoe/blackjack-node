import BaseError from "interfaces/baseError";
import RoomInformation from "interfaces/roomInformation";
import CreateRoom from "services/createRoom";
import type { NextApiRequest, NextApiResponse } from "next";

interface CreateRoomRequest {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomInformation | BaseError>
) {
  const body = req.body as CreateRoomRequest;

  if (req.method === "POST") {
    if (typeof body.name === "undefined") {
      return res.status(400).send({ message: "Field name is required." });
    }

    const roomInformation = await CreateRoom(body);

    res.status(200).json(roomInformation);
  } else {
    res.status(405).send({ message: "Method not allowed." });
  }
}

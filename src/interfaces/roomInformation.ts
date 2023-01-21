import * as Short from "short-uuid";
import PlayerInformation from "./playerInformation";

export default interface RoomInformation {
  id: Short.SUUID;
  name: string;
  expireTime: number;
  url: string;
  players: PlayerInformation[];
}

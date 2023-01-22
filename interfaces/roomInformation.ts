import * as Short from "short-uuid";
import PlayerInformation from "./playerInformation";

export default interface RoomInformation {
  id: string;
  name: string;
  expireTime: number;
  url: string;
  players: PlayerInformation[];
}

import * as Short from "short-uuid";
import BetInformation from "./betInformation";

export default interface PlayerInformation {
  id: string;
  tableNumber: number;
  name: string;
  chip: number;
  bets: BetInformation[];
}

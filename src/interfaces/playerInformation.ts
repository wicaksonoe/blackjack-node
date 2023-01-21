import * as Short from "short-uuid";

export default interface PlayerInformation {
  id: Short.UUID;
  tableNumber: number;
  name: string;
  chip: number;
}

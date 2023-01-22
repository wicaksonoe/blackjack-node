import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as short from "short-uuid";
import JoinRoomRequest from "interfaces/room/joinRoomRequest";

let socket: Socket;

export default function TestWs() {
  const [playerId] = useState(short.uuid());
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerChip, setPlayerChip] = useState(0);

  useEffect(() => {
    socketInit();
  }, []);

  const socketInit = async () => {
    await fetch("/api/ws/room");

    socket = io();

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("playerJoined", (e) => {
      console.log(e);
    });
  };

  const joinRoom = async () => {
    const joinCode: JoinRoomRequest = {
      roomId: roomId,
      playerId: playerId,
      playerName: playerName,
      playerChip: playerChip,
    };

    socket.emit("joinRoom", joinCode);
  };

  return (
    <>
      <input
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room Id"
      />
      <input
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Player Name"
      />
      <input
        onChange={(e) => setPlayerChip(parseInt(e.target.value))}
        placeholder="Player Chip"
      />
      <button onClick={joinRoom}>hehehe</button>
    </>
  );
}

import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import * as short from "short-uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [roomName, setRoomName] = useState("");

  const userId = short.uuid();
  setLocalStorage("userId", userId);

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomId = short.generate();

    console.log("USERID: ", getLocalStorage<string>("userId"));
    console.log("ROOMID: ", roomId);
    console.log("ROOMNAME: ", roomName);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="container mx-auto flex h-screen w-screen p-6">
        <div className="m-auto h-[900px] w-[900px] rounded-lg border-2 border-solid border-zinc-600">
          <div className="container mx-auto flex h-full">
            <div className="m-auto bg-black">asdasd123</div>
          </div>
        </div>
      </div> */}
      <form onSubmit={createRoom}>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">submit brooo</button>
      </form>
    </>
  );
}

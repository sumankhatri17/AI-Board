import React from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); 
import CreateRoom  from "./utility/createroom";
import JoinRoom from "./utility/joinroom";

const Room = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Create Room */}
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Create Room
          </h2>
          <CreateRoom />
        </div>

        {/* Join Room */}
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Join Room
          </h2>
          <JoinRoom />
        </div>
      </div>
    </div>
  );
};

export default Room;
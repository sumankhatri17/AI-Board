import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); 

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  // Handle room creation
  const handleRoomCreation = () => {
    if (name.trim() !== "") {
      socket.emit("createRoom", { name });
    } else {
      alert("Please enter your name");
    }
  };

  // Listen for room creation event
  useEffect(() => {
    const handleRoomCreated = (data) => {
      setRoomCode(data.roomCode);
      console.log(`Room Created with code: ${data.roomCode}`);
    };

    socket.on("roomCreated", handleRoomCreated);

    // Cleanup listener on component unmount
    return () => socket.off("roomCreated", handleRoomCreated);
  }, []);

  // Copy room code to clipboard
  const handleCodeCopy = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      alert("Room code copied to clipboard");
    } else {
      alert("No room code to copy");
    }
  };

  return (
    <form>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          readOnly
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          className="px-2 py-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleRoomCreation}
        >
          Generate
        </button>
        <button
          type="button"
          className="px-2 py-3 ml-2 text-sm font-medium text-red-800 bg-red-200 rounded-md hover:bg-red-400"
          onClick={handleCodeCopy}
        >
          Copy
        </button>
      </div>
    </form>
  );
};

export default CreateRoom;

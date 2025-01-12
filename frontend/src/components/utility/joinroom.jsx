import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); 

const Joinroom = () =>{
   const[name,setName]=useState("")
   const[roomcode,setroomCode]=useState("")


  const handlejoin=()=>{
     e.preventDefault();
    data={name,roomcode}
    socket.emit("joinroom",{data})
  }
  
  const handlerror=(data)=> {
    alert(data.message)
  }
  socket.on("error",handlerror)

  

    return (
      <form>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter room code"
            value={roomcode}
            onChange={(e)=>setroomCode(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-5 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handlejoin}
        >
          Join Room
        </button>
      </form>
    );
};

export default Joinroom;
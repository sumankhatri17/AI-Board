import React from "react";

const Room = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Create Room */}
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Create Room
          </h2>
          <form>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Generate room code"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="px-2 py-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Generate
              </button>
              <button
                type="button"
                className="px-2 py-3 ml-2 text-sm font-medium text-red-800 bg-red-200 rounded-md hover:bg-red-400"
              >
                Copy
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Generate Room
            </button>
          </form>
        </div>

        {/* Join Room */}
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Join Room
          </h2>
          <form>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter room code"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
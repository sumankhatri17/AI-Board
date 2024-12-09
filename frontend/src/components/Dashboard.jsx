import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header with the app title */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">
          White Board Sharing App 
          <span className="text-blue-500">[Users Online: _]</span>
        </h1>
      </div>

      {/* Toolbar and Canvas */}
      <div className="flex flex-col flex-1">
        {/* Toolbar */}
        <div className="bg-gray-200 border-b p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tool"
                value="pencil"
                className="form-radio"
                defaultChecked
              />
              <span className="ml-2">Pencil</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="tool" value="line" className="form-radio" />
              <span className="ml-2">Line</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="tool" value="rectangle" className="form-radio" />
              <span className="ml-2">Rectangle</span>
            </label>
          </div>
          <div className="flex space-x-2 items-center">
            <label htmlFor="color-picker" className="mr-2">
              Select Color:
            </label>
            <input
              type="color"
              id="color-picker"
              className="h-8 w-12 rounded-md"
              defaultValue="#000000"
            />
          </div>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              id="undo"
            >
              Undo
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              id="redo"
            >
              Redo
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              id="clear"
            >
              Clear Canvas
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex justify-center items-center">
          <canvas
            id="whiteboard"
            className="border border-gray-300 w-full h-full"
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

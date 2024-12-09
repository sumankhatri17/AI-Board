import React, { useState } from "react";
import Canvas from "./Canvas";

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState("pencil");
  const [selectedColor, setSelectedColor] = useState("#000000");

  return (
    <div className="flex flex-col h-screen">
      {/* Header with the app title */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">
          White Board Sharing App
          <span className="text-blue-500">[Users Online: _]</span>
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row flex-1">
        {/* Toolbar and Canvas Area */}
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
                  checked={selectedTool === "pencil"}
                  onChange={() => setSelectedTool("pencil")}
                />
                <span className="ml-2">Pencil</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tool"
                  value="line"
                  className="form-radio"
                  checked={selectedTool === "line"}
                  onChange={() => setSelectedTool("line")}
                />
                <span className="ml-2">Line</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tool"
                  value="rectangle"
                  className="form-radio"
                  checked={selectedTool === "rectangle"}
                  onChange={() => setSelectedTool("rectangle")}
                />
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
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
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
          <div className="flex-1 flex justify-center items-center p-4">
            <div className="w-full h-full max-w-6xl max-h-[600px] bg-white border-2 border-black rounded-md shadow-md p-4">
              <Canvas selectedTool={selectedTool} selectedColor={selectedColor} />
            </div>
          </div>
        </div>

        {/* Vertical Query Bar */}
        <div className="w-1/5 bg-gray-200 border-l p-4 flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Ask Queries</h2>
          <textarea
            placeholder="Type your query here..."
            className="border p-2 rounded-md h-48 resize-none"
          ></textarea>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Submit Query
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

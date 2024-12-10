import React, { useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState("pencil");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);

  // Added undo, redo, and clear handlers
  const handleUndo = () => {
    // Implement undo logic if needed
    console.log("Undo clicked");
  };

  const handleRedo = () => {
    // Implement redo logic if needed
    console.log("Redo clicked");
  };

  const handleClear = () => {
    // Implement canvas clear logic if needed
    console.log("Clear canvas");
  };

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
          {/* Updated Toolbar with all required props */}
          <Toolbar
            onToolSelect={setSelectedTool}
            onColorChange={setSelectedColor}
            onLineWidthChange={setLineWidth}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={handleClear}
          />

          {/* Canvas Area */}
          <div className="flex-1 flex justify-center items-center p-4">
            <div className="w-full h-full max-w-6xl max-h-[600px] bg-white border-2 border-black rounded-md shadow-md p-4">
              <Canvas 
                selectedTool={selectedTool} 
                color={selectedColor} 
                lineWidth={lineWidth} 
              />
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
import React, { useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import QueryBar from "./query";

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

      {/*QueryBar */}
      <QueryBar/>
        
      </div>
    </div>
  );
};

export default Dashboard;

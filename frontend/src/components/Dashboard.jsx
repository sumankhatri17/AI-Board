import React, { useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import QueryBar from "./query";
import CanvasRoot from "./Infinite Canvas/CanvasRoot";
const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState("pencil");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);

  // New states for actions with specific flags
  const [canvasAction, setCanvasAction] = useState({
    type: null,
    payload: null
  });

  // Canvas history management
  const [canvasHistory, setCanvasHistory] = useState({
    past: [],
    future: []
  });

  // History change handler
  const handleHistoryChange = (newHistory) => {
    setCanvasHistory(newHistory);
  };

  // Undo handler
  const handleUndo = () => {
    // Only trigger undo if there's history to undo
    if (canvasHistory.past.length > 1) {
      setCanvasAction({
        type: 'undo',
        payload: null
      });
    }
  };

  // Redo handler
  const handleRedo = () => {
    // Only trigger redo if there's future history
    if (canvasHistory.future.length > 0) {
      setCanvasAction({
        type: 'redo',
        payload: null
      });
    }
  };

  // Clear canvas handler
  const handleClear = () => {
    setCanvasAction({
      type: 'clear',
      payload: null
    });
  };

  // Reset action after processing
  const resetCanvasAction = () => {
    setCanvasAction({ type: null, payload: null });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header with the app title */}
      <div className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">
          White Board Sharing App
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row flex-1">
        {/* Toolbar and Canvas Area */}
        <div className="flex flex-col flex-1">
          {/* Updated Toolbar with all required props */}
          {/* <Toolbar
            onToolSelect={setSelectedTool}
            onColorChange={setSelectedColor}
            onLineWidthChange={setLineWidth}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={handleClear}
          />

          <div className="flex-1 flex justify-center items-center p-4">
            <div className="w-full h-full max-w-6xl max-h-[600px] bg-white border-2 border-black rounded-md shadow-md p-4">
              <Canvas
                selectedTool={selectedTool}
                color={selectedColor}
                lineWidth={lineWidth}
                canvasHistory={canvasHistory}
                onHistoryChange={handleHistoryChange}
                canvasAction={canvasAction}
                onActionComplete={resetCanvasAction}
              />
            </div>
          </div> */}
<CanvasRoot/>

        </div>

      {/*QueryBar */}
      <QueryBar/>
        
      </div>
    </div>
  );
};

export default Dashboard;

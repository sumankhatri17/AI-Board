import { useState } from 'react';
import Toolbar from '../Toolbar'
import React, { useEffect, useRef } from 'react';
import useSize from '@react-hook/size';
import CanvasStore from './CanvasStore';
import InfiniteCanvas from './InfiniteCanvas';
import NavigationBars from './NavigationBars';
import { useRenderLoop } from './RenderLoop';

const wheelListener = (e) => {
  const friction = 1;
  const event = e;
  const deltaX = event.deltaX * friction;
  const deltaY = event.deltaY * friction;
  if (!event.ctrlKey) {
    CanvasStore.moveCamera(deltaX, deltaY);
  } else {
    CanvasStore.zoomCamera(deltaX, deltaY);
  }
};

const pointerListener = (event) => {
  CanvasStore.movePointer(event.clientX, event.clientY);
};

const CanvasRoot = () => {
  const canvas = useRef(null);
  const [width, height] = useSize(canvas);


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
  
  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);
  
  const frame = useRenderLoop(60);
  const scale = CanvasStore.scale;

  
  return (
    <div className="w-full h-full overflow-hidden">
       <Toolbar
            onToolSelect={setSelectedTool}
            onColorChange={setSelectedColor}
            onLineWidthChange={setLineWidth}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={handleClear}
          />
      <div
        className="w-full h-full  overflow-hidden"
        ref={canvas}
        onWheel={wheelListener}
        onPointerMove={pointerListener}
     
      >

        
        <InfiniteCanvas frame={frame}  selectedTool={selectedTool}
                color={selectedColor}
                lineWidth={lineWidth}
                canvasHistory={canvasHistory}
                onHistoryChange={handleHistoryChange}
                canvasAction={canvasAction}
                onActionComplete={resetCanvasAction} />
      </div>
      {/* <NavigationBars /> */}
    </div>
  );
};

export default CanvasRoot;
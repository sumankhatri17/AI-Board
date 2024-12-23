import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React, { memo } from 'react';
import { RECT_H, RECT_W } from './constants';
import CanvasStore from './CanvasStore';
import TextBlock from './TextBlock';

const InfiniteCanvas = ({ frame ,  selectedTool, 
  lineWidth, 
  color, 
  canvasHistory,
  onHistoryChange,
  canvasAction,
  onActionComplete, canvasREF  }) => {
  const texts = [
    'Infinite',
    'Canvas',
  ];

  const colors = [
    '#f1f7ed',
    '#61c9a8',
  ];
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = CanvasStore.scale;
// added from canvas

const canvasRef = useRef(null);
const [isDrawing, setIsDrawing] = useState(false);
const [startPos, setStartPos] = useState({ x: 0, y: 0 });

// Initialize canvas
// useEffect(() => {
//   const canvas = canvasRef.current;
//   const ctx = canvas.getContext('2d');

//   // Set initial canvas properties
//   canvas.width = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;

//   ctx.strokeStyle = color;
//   ctx.fillStyle = color;
//   ctx.lineWidth = lineWidth;
//   ctx.lineCap = 'round';
// }, []);

useEffect(() => {
  const canvas = canvasRef.current;
  
  // Check if the canvas is available
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Set initial canvas properties
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
    }
  }
}, [color, lineWidth]); // Adding color and lineWidth to dependencies to reapply them if they change


// Save canvas state to history
const saveCanvasState = () => {
const canvas = canvasRef.current;
const imageData = canvas.toDataURL();

// Create a copy of current history to avoid direct mutation
const newHistory = {
  past: [...canvasHistory.past, imageData],
  future: []
};

// Notify parent component about history change
onHistoryChange(newHistory);
};

// Restore canvas from a saved state
const restoreCanvasState = (imageData) => {
const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');
const image = new Image();
image.onload = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
};
image.src = imageData;
};

// Handle canvas actions (undo/redo/clear)
useEffect(() => {
if (!canvasAction || !canvasAction.type) return;

const canvas = canvasRef.current;
const ctx = canvas.getContext('2d');

switch (canvasAction.type) {
  case 'clear':
    // Clear canvas and save initial state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
    break;

  case 'undo':
    if (canvasHistory.past.length > 1) {
      // Remove current state from past
      const currentState = canvasHistory.past.pop();
      
      // Add current state to future for potential redo
      const newHistory = {
        past: [...canvasHistory.past],
        future: [currentState, ...canvasHistory.future]
      };

      // Restore previous state
      const previousState = canvasHistory.past[canvasHistory.past.length - 1];
      restoreCanvasState(previousState);

      // Update history
      onHistoryChange(newHistory);
    }
    break;

  case 'redo':
    if (canvasHistory.future.length > 0) {
      // Get the most recent future state
      const nextState = canvasHistory.future[0];
      
      // Create new history
      const newHistory = {
        past: [...canvasHistory.past, nextState],
        future: canvasHistory.future.slice(1)
      };

      // Restore the next state
      restoreCanvasState(nextState);

      // Update history
      onHistoryChange(newHistory);
    }
    break;
}

// Notify parent that action is complete
onActionComplete();
}, [canvasAction]);

const startDrawing = (e) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const { offsetX, offsetY } = e.nativeEvent;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  setStartPos({ x: offsetX, y: offsetY });
  setIsDrawing(true);
};


const draw = (e) => {
  if (!isDrawing) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const { offsetX, offsetY } = e.nativeEvent;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  switch (selectedTool) {
    case 'pencil':
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      break;

    case 'eraser':
      ctx.clearRect(offsetX - 5, offsetY - 5, 10, 10);
      break;
  }
};

const stopDrawing = (e) => {
  if (!isDrawing) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const { offsetX, offsetY } = e.nativeEvent;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  switch (selectedTool) {
    case 'pencil':
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      break;

    case 'square':
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
      break;

    case 'circle':
      const radius = Math.sqrt(
        Math.pow(offsetX - startPos.x, 2) +
        Math.pow(offsetY - startPos.y, 2)
      );
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      break;

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        const triangleHeight = Math.sqrt(3) / 2 * Math.abs(offsetX - startPos.x) * 2;
        ctx.lineTo(startPos.x - (offsetX - startPos.x), startPos.y + triangleHeight);
        ctx.lineTo(startPos.x + (offsetX - startPos.x), startPos.y + triangleHeight);
        ctx.closePath();
        ctx.stroke();
        break;
    
    case 'text':
      const text = prompt('Enter text:');
      if (text) {
        ctx.font = '20px Arial';
        ctx.fillText(text, offsetX, offsetY);
      }
      break;
  }

  // Save canvas state after drawing
  saveCanvasState();
  setIsDrawing(false);
};

  return (
    <div
      className="w-full h-full bg-pink-400"
      style={{
        transform: `scale(${scale.x}, ${scale.y})`,
      }}
    >
      <canvas
      ref={canvasRef}
      style={{
        transform: `scale(${scale.x}, ${scale.y})`,
      }}
      className="w-full bg-green-300 h-full"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
      {texts.map((text, index) => (
        <TextBlock
          key={index}
          text={text}
          color={colors[index]}
          left={(index % 3) * rectW}
          top={Math.floor(index / 3) * rectH}
          width={rectW}
          height={rectH}
        />
      ))}
    </div>
  );
};

export default memo(InfiniteCanvas)
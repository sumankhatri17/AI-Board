import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ selectedTool, lineWidth, color }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set initial canvas properties
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
  }, [color, lineWidth]);

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

    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default Canvas;
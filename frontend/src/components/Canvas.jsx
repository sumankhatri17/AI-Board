import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ selectedTool }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set up initial canvas properties
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineWidth = 2; // Default line width
    ctx.lineCap = "round"; // Smooth line edges
    ctx.strokeStyle = "#000000"; // Default line color

    setContext(ctx);

    // Resize canvas dynamically
    const handleResize = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.putImageData(imageData, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (e) => {
    if (!context) return;

    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;

    if (selectedTool === "pencil") {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }

    setStartPos({ x: offsetX, y: offsetY });
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (selectedTool === "pencil") {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (!context) return;

    setIsDrawing(false);

    if (selectedTool === "line") {
      const { offsetX, offsetY } = e.nativeEvent;
      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();
      context.closePath();
    }

    if (selectedTool === "rectangle") {
      const { offsetX, offsetY } = e.nativeEvent;
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;
      context.beginPath();
      context.rect(startPos.x, startPos.y, width, height);
      context.stroke();
      context.closePath();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    ></canvas>
  );
};

export default Canvas;

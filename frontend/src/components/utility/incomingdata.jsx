const denormalizeCoordinates = (x, y, canvas) => {
  const denormalized = { x: x * canvas.width, y: y * canvas.height };
  console.log(
    "Denormalization - Normalized:",
    { x, y },
    "Denormalized:",
    denormalized
  );
  return denormalized;
};

const handleIncomingDraw = (ctx, data) => {
  const { tool, startX, startY, endX, endY, color, lineWidth, text } = data;

  // Denormalize coordinates
  const start = denormalizeCoordinates(startX, startY, ctx.canvas);
  const end = denormalizeCoordinates(endX, endY, ctx.canvas);

  console.log("Incoming Draw Data:", { start, end, tool });

  // Apply styles
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  switch (tool) {
    case "pencil":
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      break;

    case "eraser":
      ctx.clearRect(end.x - 5, end.y - 5, 10, 10);
      break;

    case "square":
      const width = end.x - start.x;
      const height = end.y - start.y;
      ctx.strokeRect(start.x, start.y, width, height);
      break;

    case "circle":
      const radius = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      break;

    case "triangle":
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      const triangleHeight = (Math.sqrt(3) / 2) * Math.abs(end.x - start.x) * 2;
      ctx.lineTo(start.x - (end.x - start.x), start.y + triangleHeight);
      ctx.lineTo(start.x + (end.x - start.x), start.y + triangleHeight);
      ctx.closePath();
      ctx.stroke();
      break;

    case "text":
      if (text) {
        ctx.font = "20px Arial";
        ctx.fillText(text, start.x, start.y);
      }
      break;

    default:
      console.error("Unknown tool:", tool);
      break;
  }
};

export default handleIncomingDraw;

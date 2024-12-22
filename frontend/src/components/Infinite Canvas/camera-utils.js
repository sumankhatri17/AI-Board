export const cameraToScreenCoordinates = (x, y, z, angle, aspect) => {
  const height = 2 * z * Math.tan(angle);
  const width = height * aspect;
  return {
    x: x - width / 2,
    y: y - height / 2,
    width,
    height,
  };
};

export const scaleWithAnchorPoint = (
  anchorX,
  anchorY,
  x,
  y,
  oldScaleX,
  oldScaleY,
  newScaleX,
  newScaleY
) => {
  return {
    x: anchorX - ((anchorX - x) * newScaleX) / oldScaleX,
    y: anchorY - ((anchorY - y) * newScaleY) / oldScaleY,
  };
};
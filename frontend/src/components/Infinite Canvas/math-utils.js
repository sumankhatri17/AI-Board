export const radians = (angle) => {
  return angle * (Math.PI / 180);
};

export const inBounds = (rect1, rect2) => {
  if (
    rect1.left < rect2.left + rect2.width &&
    rect1.left + rect1.width > rect2.left &&
    rect1.top < rect2.top + rect2.height &&
    rect1.top + rect1.height > rect2.top
  )
    return true;
  else return false;
};
import React from 'react';
import CanvasStore from './CanvasStore';
import { inBounds } from './math-utils';

export const Position = ({ left, top, width, height, children }) => {
  const screen = CanvasStore.screen;
  if (
    inBounds(
      { left, top, height, width },
      {
        left: screen.x,
        top: screen.y,
        width: screen.width,
        height: screen.height,
      }
    )
  ) {
    return (
      <div
        className="absolute inline-block"
        style={{
          left: `${left - screen.x}px`,
          top: `${top - screen.y}px`,
        }}
      >
        {children}
      </div>
    );
  } else return null;
};
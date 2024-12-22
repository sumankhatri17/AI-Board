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
  
  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);
  
  const frame = useRenderLoop(60);
  
  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full relative overflow-hidden overscroll-none"
        ref={canvas}
        onWheel={wheelListener}
        onPointerMove={pointerListener}
      >
        <InfiniteCanvas frame={frame} />
      </div>
      <NavigationBars />
    </div>
  );
};

export default CanvasRoot;
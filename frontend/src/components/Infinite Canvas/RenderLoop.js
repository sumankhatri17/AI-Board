import { useEffect, useRef, useState } from 'react';
import CanvasStore from './CanvasStore';

class RenderLoop {
  constructor(fps = 0, draw) {
    this.fps = fps;
    this.draw = draw;
    this.lastFrameTime = 0;
    this.lastRequestId = null;
  }

  initialize(fps) {
    this.fps = fps;
  }

  start() {
    this.lastFrameTime = performance.now();
    this.loop();
  }

  stop() {
    if (this.lastRequestId) cancelAnimationFrame(this.lastRequestId);
    this.lastRequestId = null;
  }

  get fpsInterval() {
    return 1000 / this.fps;
  }

  loop() {
    this.lastRequestId = requestAnimationFrame(() => this.loop());
    const now = performance.now();
    const elapsed = now - this.lastFrameTime;
    if (elapsed > this.fpsInterval) {
      this.lastFrameTime = now - (elapsed % this.fpsInterval);
      this.draw();
    }
  }
}

let renderLoop;
export function getRenderLoop(fps = 15, draw) {
  if (!renderLoop) return new RenderLoop(fps, draw);
  else return renderLoop;
}

export const useRenderLoop = (fps = 15) => {
  const [frame, setFrame] = useState('0');
  const loop = useRef(
    getRenderLoop(fps, () => {
      if (CanvasStore.shouldRender) {
        setFrame(performance.now());
        CanvasStore.shouldRender = false;
      }
    })
  );

  useEffect(() => {
    CanvasStore.shouldRender = true;
    loop.current.start();

    return () => loop.current.stop();
  }, []);
  return frame;
};

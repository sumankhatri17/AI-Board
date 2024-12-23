import { CAMERA_ANGLE, RECT_W, RECT_H } from './constants';
import { cameraToScreenCoordinates } from './camera-utils';

export const getInitialCanvasState = () => {
  return {
    shouldRender: true,
    pixelRatio: window.devicePixelRatio || 1,
    container: {
      width: 0,
      height: 0,
    },
    pointer: {
      x: 0,
      y: 0,
    },
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

let canvasData = getInitialCanvasState();

class CanvasStore {
  static get data() {
    if (!canvasData) {
      canvasData = getInitialCanvasState();
    }
    return canvasData;
  }

  static initialize(width, height) {
    const containerWidth = width;
    const containerHeight = height;
    canvasData = getInitialCanvasState();
    canvasData.pixelRatio = window.devicePixelRatio || 1;
    canvasData.container.width = containerWidth;
    canvasData.container.height = containerHeight;
    canvasData.camera.x = 1.5 * RECT_W;
    canvasData.camera.y = 1.5 * RECT_H;
    canvasData.camera.z = containerWidth / (2 * Math.tan(CAMERA_ANGLE));
  }

  static get screen() {
    const { x, y, z } = this.camera;
    const aspect = this.aspect;
    const angle = CAMERA_ANGLE;
    return cameraToScreenCoordinates(x, y, z, angle, aspect);
  }

  static get camera() {
    return this.data.camera;
  }

  static get scale() {
    const { width: w, height: h } = CanvasStore.screen;
    const { width: cw, height: ch } = CanvasStore.container;
    return { x: cw / w, y: ch / h };
  }

  static get shouldRender() {
    return canvasData.shouldRender;
  }

  static set shouldRender(value) {
    canvasData.shouldRender = value;
  }

  static get container() {
    return canvasData.container;
  }

  static get pointer() {
    return canvasData.pointer;
  }

  static get aspect() {
    return canvasData.container.width / canvasData.container.height;
  }

  static isCameraInBounds(cameraX, cameraY, cameraZ) {
    return true;
  }

  static isCameraInBounds(cameraX, cameraY, cameraZ) {
    //limit screen size
    const minX = -10000;
    const maxX = 10000;
    const minY = -10000;
    const maxY = 10000;
    
    return (
      cameraX >= minX &&
      cameraX <= maxX &&
      cameraY >= minY &&
      cameraY <= maxY
    );
  }

  static moveCamera(mx, my) {
    const scrollFactor = 1.5;
    const deltaX = mx * scrollFactor;
    const deltaY = my * scrollFactor;
    const { x, y, z } = this.camera;
    
    const newX = x + deltaX;
    const newY = y + deltaY;
    
    if (this.isCameraInBounds(newX, newY, z)) {
      this.data.camera.x = newX;
      this.data.camera.y = newY;
      this.shouldRender = true;
      this.movePointer(deltaX, deltaY);
    }
  }

  static zoomCamera(deltaX, deltaY) {
    const zoomScaleFactor = 0.001;
    const zoomAmount = 1 + deltaY * zoomScaleFactor;
    
    const { x: cameraX, y: cameraY, z: cameraZ } = this.camera;
    const { x: pointerX, y: pointerY } = this.pointer;
    
    const newZ = cameraZ * zoomAmount;
    
    //zoom limit 1000
    if (newZ < 100 || newZ > 10000) return;
    
    const screen = this.screen;
    const scale = this.scale;
    
    const worldX = pointerX * scale.x + screen.x;
    const worldY = pointerY * scale.y + screen.y;
    
    const newCameraX = worldX - (worldX - cameraX) * zoomAmount;
    const newCameraY = worldY - (worldY - cameraY) * zoomAmount;
    
    if (this.isCameraInBounds(newCameraX, newCameraY, newZ)) {
      this.data.camera = {
        x: newCameraX,
        y: newCameraY,
        z: newZ,
      };
      this.shouldRender = true;
    }
  }

  static movePointer(clientX, clientY) {
  
    const scale = this.scale;
    const screen = this.screen;
    this.data.pointer = {
      x: clientX / scale.x,
      y: clientY / scale.y,
    };
  }

  // Add navigation methods
  static moveLeft(amount = 50) {
    this.moveCamera(-amount, 0);
  }

  static moveRight(amount = 50) {
    this.moveCamera(amount, 0);
  }

  static moveUp(amount = 50) {
    this.moveCamera(0, -amount);
  }

  static moveDown(amount = 50) {
    this.moveCamera(0, amount);
  }
}



export default CanvasStore;
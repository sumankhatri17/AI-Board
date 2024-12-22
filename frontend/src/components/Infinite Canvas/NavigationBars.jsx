import React from 'react';
import CanvasStore from './CanvasStore';

const NavigationBars = () => {
  return (
    <>
      {/* Horizontal Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => CanvasStore.moveLeft()}
        >
          ←
        </button>
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => CanvasStore.moveRight()}
        >
          →
        </button>
      </div>

      {/* Vertical Navigation Bar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 bg-white/80 backdrop-blur-sm px-2 py-4 rounded-lg shadow-lg">
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => CanvasStore.moveUp()}
        >
          ↑
        </button>
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => CanvasStore.moveDown()}
        >
          ↓
        </button>
      </div>
    </>
  );
};

export default NavigationBars;
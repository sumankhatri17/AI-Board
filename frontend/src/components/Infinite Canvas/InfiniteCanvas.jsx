import React, { memo } from 'react';
import { RECT_H, RECT_W } from './constants';
import CanvasStore from './CanvasStore';
import TextBlock from './TextBlock';

const InfiniteCanvas = ({ frame }) => {
  const texts = [
    'Infinite',
    'Canvas',
  ];

  const colors = [
    '#f1f7ed',
    '#61c9a8',
  ];
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = CanvasStore.scale;

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${scale.x}, ${scale.y})`,
        transformOrigin: 'top left',
      }}
    >
      {texts.map((text, index) => (
        <TextBlock
          key={index}
          text={text}
          color={colors[index]}
          left={(index % 3) * rectW}
          top={Math.floor(index / 3) * rectH}
          width={rectW}
          height={rectH}
        />
      ))}
    </div>
  );
};

export default memo(InfiniteCanvas)
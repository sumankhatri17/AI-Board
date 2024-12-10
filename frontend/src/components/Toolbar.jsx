import React, { useState, useRef } from 'react';
import { Pencil, Eraser, Square, Triangle, Circle, Type, ZoomIn, ZoomOut, Download, Upload, Undo, Redo, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const Toolbar = ({ onToolSelect, onLineWidthChange, onColorChange, onUndo, onRedo, onClear }) => {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [lineWidth, setLineWidth] = useState(2);

  // Use useRef for color state to avoid unnecessary re-renders
  const colorRef = useRef('#000000');

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    onToolSelect(tool); // Pass selected tool to the parent
  };

  const handleLineWidthChange = (width) => {
    setLineWidth(width);
    onLineWidthChange(width); // Pass line width to parent
  };

  const handleColorChange = (newColor) => {
    colorRef.current = newColor; // Update colorRef instead of state
    onColorChange(newColor); // Pass color to parent (if necessary)
  };

  return (
    <div className="bg-gray-50 shadow-lg p-4 flex items-center justify-between rounded-md border border-gray-200">
      {/* Undo, Redo, and Clear */}
      <div className="flex items-center space-x-4">
        <Button variant="secondary" onClick={onUndo}>
          <Undo className="h-5 w-5" />
        </Button>
        <Button variant="secondary" onClick={onRedo}>
          <Redo className="h-5 w-5" />
        </Button>
        <Button variant="secondary" onClick={onClear}>
          <Trash className="h-5 w-5" />
        </Button>
      </div>

      {/* Tools */}
      <div className="flex items-center space-x-4">
        <Button variant={selectedTool === 'pencil' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('pencil')}>
          <Pencil className="h-5 w-5" />
        </Button>
        <Button variant={selectedTool === 'eraser' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('eraser')}>
          <Eraser className="h-5 w-5" />
        </Button>
        <Button variant={selectedTool === 'square' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('square')}>
          <Square className="h-5 w-5" />
        </Button>
        <Button variant={selectedTool === 'triangle' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('triangle')}>
          <Triangle className="h-5 w-5" />
        </Button>
        <Button variant={selectedTool === 'circle' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('circle')}>
          <Circle className="h-5 w-5" />
        </Button>
        <Button variant={selectedTool === 'text' ? 'primary' : 'secondary'} onClick={() => handleToolSelect('text')}>
          <Type className="h-5 w-5" />
        </Button>
      </div>

      {/* Line Width Selector */}
      <div className="flex items-center space-x-4">
        <Select value={lineWidth} onChange={(e) => handleLineWidthChange(e.target.value)}>
          <SelectTrigger>
            <Button variant="secondary" className="py-1 px-2 text-sm rounded-full border border-gray-300">
              {lineWidth}px
            </Button>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((width) => (
              <SelectItem key={width} value={width}>
                {width}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color Picker */}
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={colorRef.current} // Use colorRef to get the current color
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-8 h-8 border-0"
        />
      </div>

      {/* Zoom and Actions */}
      <div className="flex items-center space-x-4">
        <Button variant="secondary">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="secondary">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="secondary">
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="secondary">
          <Upload className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
import React, { useState } from 'react';

const Select = ({ value, onChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <SelectTrigger onClick={toggleSelect}>
        {children[0]}
      </SelectTrigger>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <SelectContent>
            {children.slice(1).map((child, index) =>
              React.cloneElement(child, {
                key: index,
                onClick: () => handleOptionSelect(child.props.value),
              })
            )}
          </SelectContent>
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      {...props}
    >
      {children}
    </button>
  );
};

const SelectContent = ({ children }) => {
  return (
    <div className="py-1">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className:
            'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        })
      )}
    </div>
  );
};

const SelectItem = ({ children, ...props }) => {
  return <a href="#" {...props}>{children}</a>;
};

export { Select, SelectTrigger, SelectContent, SelectItem };
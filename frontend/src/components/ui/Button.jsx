import React from 'react';

const Button = ({ variant = 'primary', children, ...props }) => {
  const buttonStyles = {
    primary:
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    secondary:
      'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
  };

  return (
    <button
      className={`${buttonStyles[variant]} inline-flex items-center`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
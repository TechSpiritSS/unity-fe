import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
      <div className="flex space-x-3 animate-pulse">
        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;

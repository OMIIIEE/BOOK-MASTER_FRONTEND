// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default Loader;

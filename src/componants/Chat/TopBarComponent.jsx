import React from "react";

const TopBarComponent = () => {
  return (
    <header className="flex items-center bg-white p-4 border-b border-gray-300">
      <div className="flex-shrink-0">
        <img src="logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-center ml-auto space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-40 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          onChange={(e) => console.log("Header search:", e.target.value)}
        />
      </div>
    </header>
  );
};

export default TopBarComponent;

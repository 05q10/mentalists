import React from "react";

const Workspace = () => {
  // Function to handle click events on specific coordinates
  const handleClick = (area) => {
    alert(`You clicked on ${area}`);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Sketchfab Model with Autoplay */}
      <iframe
        title="My Workspace"
        className="absolute top-0 left-0 w-full h-full border-none"
        allowFullScreen
        src="https://sketchfab.com/models/bde6b4dc20b74b169d27e0875cee5b6e/embed?autostart=1"
      ></iframe>

      {/* Clickable Areas */}
      <div
        className="absolute top-[50%] left-[40%] w-6 h-6 bg-red-500 opacity-50 cursor-pointer rounded-full"
        onClick={() => handleClick("Desk")}
      ></div>

      <div
        className="absolute top-[60%] left-[55%] w-6 h-6 bg-blue-500 opacity-50 cursor-pointer rounded-full"
        onClick={() => handleClick("Laptop")}
      ></div>

      <div
        className="absolute top-[70%] left-[45%] w-6 h-6 bg-green-500 opacity-50 cursor-pointer rounded-full"
        onClick={() => handleClick("Chair")}
      ></div>
    </div>
  );
};

export default Workspace;

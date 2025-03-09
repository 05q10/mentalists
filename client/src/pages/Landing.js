import React from "react";
import { useNavigate } from "react-router-dom";
import landingVideo from "../video/landingcopy.mp4"; // Adjust path as needed

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={landingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Button */}
      <button
        onClick={() => navigate("/comm")}
        className="px-10 py-4 text-2xl font-bold uppercase text-purple-500 border-4 border-purple-600 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-purple-500 hover:shadow-md glow font-serif tracking-widest"
      >
        GigWiz<br></br>
        Join the Hub
      </button>
    </div>
  );
};

export default Landing;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create a video element
    let video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.id = "landingVideo";

    // Set the video source (must be from public/)
    let source = document.createElement("source");
    source.src = "/landing.mp4"; // Ensure file is inside 'public'
    source.type = "video/mp4";

    // Append source to video
    video.appendChild(source);

    // Apply styles for fullscreen effect
    Object.assign(video.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: "-1", // Puts video in the background
    });

    // Append video to the body
    document.body.appendChild(video);

    return () => {
      // Cleanup: Remove video when component unmounts
      document.body.removeChild(video);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {/* Logo */}
      

      <button
        onClick={() => navigate("/comm")}
        className="px-10 py-4 text-2xl font-bold uppercase text-purple-500 border-4 border-purple-600 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-purple-500 hover:shadow-md glow"
      >
        GigWiz<br></br>
        Join the Hub
      </button>
    </div>
  );
};

export default Landing;

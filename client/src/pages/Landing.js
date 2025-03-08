document.addEventListener("DOMContentLoaded", function() {
    // Create a video element
    let video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.id = "landingVideo";

    // Set the video source (must be from public/)
    let source = document.createElement("source");
    source.src = "/landing.mp4"; // Correct path for public folder
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
        zIndex: "-1" // Puts video in the background
    });

    // Append video to the body
    document.body.appendChild(video);
});

// Export function for modular usage
function Landing() {
    console.log("Landing page video initialized.");
}

export default Landing;
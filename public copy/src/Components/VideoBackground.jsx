import React from "react";

const VideoBackground = ({ src }) => {
  return (
    <video
      autoPlay
      muted
      loop
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;

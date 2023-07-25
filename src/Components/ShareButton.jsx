import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";

const ShareCanvas = ({ canvasRef }) => {
  const shareCanvas = async () => {
    // const canvas = canvasRef.current;
    const canvas = document.getElementById("qrcode");

    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    try {
      // Convert canvas element to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png", 1.0);
      });

      // Create modified canvas element with white background and borders
      const canvasWithBorders = document.createElement("canvas");
      const context = canvasWithBorders.getContext("2d");

      // Set canvas size
      canvasWithBorders.width = canvas.width + 20;
      canvasWithBorders.height = canvas.height + 20;

      // Draw white background
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvasWithBorders.width, canvasWithBorders.height);

      // Draw original image
      context.drawImage(canvas, 10, 10);

      // Convert modified canvas into image blob
      const modifiedBlob = await new Promise((resolve) => {
        canvasWithBorders.toBlob(resolve, "image/png", 1.0);
      });

      // Share modified image using navigator.share API
      await navigator.share({
        files: [new File([modifiedBlob], "qrcode.png", { type: "image/png" })],
      });
    } catch (error) {
      console.error("Error sharing content: ", error);
    }
  };

  return (
    <Button
      sx={{ width: "97%", mr: 2 }}
      variant="contained"
      onClick={shareCanvas}
      endIcon={<ShareIcon />}
    >
      SHARE
    </Button>
  );
};

export default ShareCanvas;

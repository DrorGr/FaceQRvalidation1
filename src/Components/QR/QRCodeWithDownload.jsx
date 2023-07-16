import React, { useEffect, useState, useRef  } from "react";
import QRCode from "qrcode.react";
import Button from "@mui/material/Button";
import ShareButton from "../ShareButton";

const QRCodeWithDownload = ({ value }) => {

  const handleDownload = () => {
    const canvas = document.querySelector("#qrcode");

    if (canvas) {
      // canvas.toBlob(
      //   (blob) => {
      //     const url = URL.createObjectURL(blob);
      //     const link = document.createElement("a");
      //     link.download = "qrcode.png";
      //     link.href = url;
      //     link.click();
      //     URL.revokeObjectURL(url);
      //   },
      //   "image/png",
      //   1.0
      // );
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);

          // Create a new canvas element with white background and borders
          const canvasWithBorders = document.createElement("canvas");
          const context = canvasWithBorders.getContext("2d");

          // Set canvas size
          canvasWithBorders.width = canvas.width + 20;
          canvasWithBorders.height = canvas.height + 20;

          // Draw white background
          context.fillStyle = "#ffffff";
          context.fillRect(
            0,
            0,
            canvasWithBorders.width,
            canvasWithBorders.height
          );

          // Draw original image
          context.drawImage(canvas, 10, 10);

          // Draw borders
          // context.strokeStyle = "#000000";
          // context.strokeRect(0, 0, canvasWithBorders.width, canvasWithBorders.height);
          // context.strokeRect(10, 10, canvas.width, canvas.height);

          // Convert modified canvas into image blob
          canvasWithBorders.toBlob(
            (modifiedBlob) => {
              // Create link element with modified image blob and trigger download
              const link = document.createElement("a");
              link.download = "qrcode.png";
              link.href = URL.createObjectURL(modifiedBlob);
              link.click();
              URL.revokeObjectURL(link.href);
            },
            "image/png",
            1.0
          );
        },
        "image/png",
        1.0
      );
    }
  };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "3px",
          width: "fit-content",
          display: "flex",
          scale: "1.2",
          marginTop: "10%",
        }}
      >
        <QRCode
          id="qrcode"
          value={value}
          size={1024}
          style={{ maxWidth: 256, maxHeight: 256 }}
        />
      </div>
      <br />
      <br />
      <ShareButton />
      <br />
      <Button onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default QRCodeWithDownload;

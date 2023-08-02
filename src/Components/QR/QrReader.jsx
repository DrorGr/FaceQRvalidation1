import React, { useState, useRef } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

function QrReader({ qrData, next }) {
  const [scanning, setScanning] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);
  const scannerRef = useRef();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Change 600px to your desired breakpoint

  const handleStartScan = () => {
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleDecode = (result) => {
    console.log(result);
    qrData(result);
    // next();
    handleCloseCamera();
  };

  const handleError = (error) => {
    console.log(error?.message);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: isSmallScreen ? '100%' : '50%',
          display: 'inline-block',
        }}
      >
        {cameraOpen && (
          <QrScanner
            ref={scannerRef}
            onDecode={handleDecode}
            onError={handleError}
            style={{ height: window.innerHeight * 0.1 }}
          />
        )}
        {!cameraOpen && <Button onClick={handleOpenCamera}>Open Camera</Button>}
        {/* {cameraOpen && (
          <div>
            {!scanning && <Button onClick={handleStartScan}>Start Scan</Button>}
            {scanning && <Button onClick={handleStopScan}>Stop Scan</Button>}
            <Button onClick={handleCloseCamera}>Close Camera</Button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default QrReader;

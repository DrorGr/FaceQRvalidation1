import React, { useState, useRef } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

function QrReader({ qrData, next }) {
  const [cameraOpen, setCameraOpen] = useState(true);
  const scannerRef = useRef();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Change 600px to your desired breakpoint

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };
  
  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleDecode = (result) => {
    qrData(result);
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
            onResult={handleDecode}
            onError={handleError}
            style={{ height: window.innerHeight * 0.1 }}
          />
        )}
        {!cameraOpen && (
          <Button variant='outlined' onClick={handleOpenCamera}>
            Scan again
          </Button>
        )}
      </div>
    </div>
  );
}

export default QrReader;

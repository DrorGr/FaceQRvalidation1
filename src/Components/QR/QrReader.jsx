import React, { useState, useRef } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';

function QrReader({ qrData, next }) {
  const [cameraOpen, setCameraOpen] = useState(true);
  const scannerRef = useRef();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Change 600px to your desired breakpoint
const { enqueueSnackbar } = useSnackbar();
  const handleOpenCamera = () => {
    setCameraOpen(true);
  };
  
  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleDecode = (result) => {
    enqueueSnackbar('QR code read successfully', { variant: 'success' });
    qrData(result);
    handleCloseCamera();
  };

  const handleError = (error) => {
    enqueueSnackbar('Error reading QR code', { variant: 'error' });
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
            tracker={true}
            hideCount={false}
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

import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import VerticalLinearStepper from '../Stepper';
import Logic from '../../Logic/Logic';
import QrReader from '../QR/QrReader';
import FaceVerification from '../Face/FaceVerification';
import { useNavigate } from 'react-router';
import { List, ListItem, ListItemText } from '@material-ui/core';
import * as faceapi from 'face-api.js';
import { useSnackbar } from 'notistack';

function VerificationPage() {
  const [qrData, setQrData] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const myLogic = new Logic();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
  }, []);

  const handleNext = (page) => {
    setActiveStep(page);
  };

  const handleReset = () => {
    setActiveStep(0);
    setQrData('');
    console.log('reset');
  };

  const handleDeCompressData = (data) => {
    const uzQr = myLogic.unzip(data);
    if (uzQr !== -1) {
      // setQrData(myLogic.unzip(data));
      setQrData(uzQr);
      handleNext(1);
    } else {
      enqueueSnackbar('Unsupported QR code', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const steps = [
    {
      label: 'QR Scanning',
      content: <QrReader qrData={handleDeCompressData} next={() => handleNext(1)} />,
    },
    {
      label: 'Face Scanning',
      content: <FaceVerification photoDescriptor={qrData.photoDescriptor} next={() => handleNext(2)} />,
    },
    {
      label: 'Personal Data',
      content: (
        <div style={{ textAlignLast: 'center', color: 'black' }}>
          {qrData !== '' && (
            <List>
              {Object.keys(qrData).map(
                (key, index) =>
                  key !== 'photoDescriptor' && (
                    <ListItem key={index} color='black'>
                      <ListItemText primary={key} secondary={<Typography color='black'>{qrData[key]}</Typography>} />
                    </ListItem>
                  )
              )}
            </List>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Typography m={2} sx={{ fontFamily: 'Segoe UI', textAlign: 'center', color: 'black' }} variant='h4'>
          Verification
        </Typography>
        <VerticalLinearStepper
          steps={steps}
          // isLandmark={isLandmark}
          reset={handleReset}
          aStep={activeStep}
          sendData={() => navigate('/', { replace: true })}
          options={['Verify again', 'Back to home']}
        />
      </Container>
    </>
  );
}

export default VerificationPage;

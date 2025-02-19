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
import pako from "pako";
import msgpack from "msgpack-lite";

function VerificationPage() {
  const [qrData, setQrData] = useState({ name: '',
    email: '',
    phone: '',
    image: '',
    referenceNumber: Math.ceil(Math.random() * 99999999).toString(),});
   const [landmarks, setLandmarks] = useState([0]);
  const [activeStep, setActiveStep] = useState(0);
  const myLogic = new Logic();
  const { enqueueSnackbar } = useSnackbar();
  let data ;
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

  const handleDeCompressData = (data1) => {

    const compressedBytes = Uint8Array.from(atob(data1), c => c.charCodeAt(0));
const decompressed = pako.inflate(compressedBytes);
const unpacked = msgpack.decode(decompressed)

    setQrData({
      name: unpacked.name,
      email: unpacked.email,
      phone: unpacked.phone,
      image: unpacked.image,
      referenceNumber: unpacked.referenceNumber,
    })
    setLandmarks(unpacked.landmarks);
    data= unpacked
    console.log(data?.landmarks)
    handleNext(1);
  };

  const steps = [ 
    {
      label: 'QR Scanning',
      content: <QrReader qrData={handleDeCompressData} next={() => handleNext(1)} />,
    },
    {
      label: 'Face Scanning',
      content: <FaceVerification photoDescriptor={data?.landmarks} next={() => handleNext(2)} />,
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
          reset={handleReset}
          aStep={activeStep}
          sendData={() => navigate('/Home', { replace: true })}
          options={['Verify again', 'Back to home']}
        />
      </Container>
    </>
  );
}

export default VerificationPage;

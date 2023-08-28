import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import FaceRecognition from '../Face/FaceRecognition';
import MyForm from '../Form';
import Typography from '@mui/material/Typography';
import VerticalLinearStepper from '../Stepper';
import Summery from '../SummeryDetails/Summery';
import * as faceapi from 'face-api.js';

function RegistrationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [landmarks, setLandmarks] = useState([0]);
  const [formData, setformData] = React.useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    referenceNumber: Math.ceil(Math.random() * 99999999),
  });

  // const DemoUrl = 'https://3aaa-81-218-77-178.ngrok-free.app/Demo';
  const DemoUrl2 = 'http://localhost:7194/Demo';

  const sendData = async () => {
    await fetch(DemoUrl2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        faceDescriptor: Array.from(landmarks),
        faceImage: formData.image.substr(formData.image.indexOf(',') + 1),
        referenceNumber: `${formData.referenceNumber}`,
      }),
    });
  };

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

  const handleSubmit = (formData) => {
    setformData(formData);
  };

  const handleLandmarksDetected = (detectedLandmarks) => {
    setLandmarks(detectedLandmarks[0].descriptor);
    setActiveStep(2);
  };

  const handleReset = () => {
    setActiveStep(0);
    setLandmarks([0]);
  };

  const steps = [
    {
      label: 'Personal Data ',
      content: <MyForm onSubmit={handleSubmit} formData={formData} setFormData={setformData} />,
    },
    {
      label: 'Face Capturing',
      content: <FaceRecognition onLandmarksDetected={handleLandmarksDetected} setFormData={setformData} formData={formData} />,
    },
    {
      label: 'Summery Details',
      content: <Summery formData={formData} />,
    },
  ];
  return (
    <>
      <Typography
        sx={{
          m: 2,
          fontFamily: 'Segoe UI',
          textAlign: 'center',
          color: '#071f2a',
        }}
        variant='h4'
      >
        Registration
      </Typography>
      <Container sx={{ mt: 2 }}>
        <VerticalLinearStepper steps={steps} reset={handleReset} aStep={activeStep} sendData={sendData} />
      </Container>
    </>
  );
}

export default RegistrationPage;

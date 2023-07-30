import React, { useState } from 'react';
import { Container } from '@mui/material';
import FaceRecognition from '../Face/FaceRecognition';
import MyForm from '../Form';
import Typography from '@mui/material/Typography';
import VerticalLinearStepper from '../Stepper';
import Summery from '../SummeryDetails/Summery';
import Logic from '../../Logic/Logic';
import * as faceapi from 'face-api.js';
import { useEffect } from 'react';

function RegistratioPage() {
  const [genQrData, setGenQrData] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [landmarks, setLandmarks] = useState([0]);
  const [formData, setformData] = React.useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    referenceNumber: Math.ceil(Math.random() * 99999999),
  });

  // const removeBase64Prefix = (base64) => {
  //   return base64.substr(base64.indexOf(',') + 1);
  // };

  const DemoUrl = 'https://localhost:7194/Demo';
  const DemoUrl2 = 'http://192.168.40.24:12006/Demo';

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
    // const data = await response.json();
    // console.log(data);
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

  const myLogic = new Logic();
  const handleLandmarksDetected = (detectedLandmarks) => {
    if (detectedLandmarks.length > 0) {
      compressData(detectedLandmarks);
      setLandmarks(detectedLandmarks[0].descriptor);
      setActiveStep(2);
    }
  };

  const compressData = (detectedLandmarks) => {
    setGenQrData(
      myLogic.zip({
        company: 'PANGEA',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photoDescriptor: detectedLandmarks[0].descriptor,
      })
    );
  };

  const handleReset = () => {
    console.log('reset');
    setformData({
      name: '',
      email: '',
      phone: '',
    });
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Personal Data ',
      content: <MyForm onSubmit={handleSubmit} formData={formData} setFormData={setformData} />,
    },
    {
      label: 'Face Capturing',
      content: <FaceRecognition onLandmarksDetected={handleLandmarksDetected} setformData={setformData} />,
    },
    // {
    //   label: "QR",
    //   content: (
    //     <QRCodeWithDownload value={genQrData} fileName="example-qrcode" />
    //   ),
    // },
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
        REGISTRATION
      </Typography>
      <Container sx={{ mt: 5 }}>
        <VerticalLinearStepper
          steps={steps}
          // isLandmark={isLandmark}
          reset={handleReset}
          aStep={activeStep}
          sendData={sendData}
        />
      </Container>
    </>
  );
}

export default RegistratioPage;

import React, { useState, useEffect, useRef, version } from 'react';
import { Container } from '@mui/material';
import FaceRecognition from '../Face/FaceRecognition';
import MyForm from '../Form';
import Typography from '@mui/material/Typography';
import VerticalLinearStepper from '../Stepper';
import Summery from '../SummeryDetails/Summery';
import * as faceapi from 'face-api.js';
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode'
import pako from "pako";
import msgpack from "msgpack-lite";




function RegistrationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [landmarks, setLandmarks] = useState([0]);
  const [formData, setformData] = React.useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    referenceNumber: Math.ceil(Math.random() * 99999999).toString(),
  });

  const sendData = (e) => {
    e.preventDefault();


    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 1,
      margin: 1,
      version : 32,
      size : 256
    }

    
  function CompressedQR() {

    const packed = msgpack.encode({
      name : formData.name,
      email : formData.email,
      phone : formData.phone,
      referenceNumber : formData.referenceNumber,
      landmarks : landmarks,
    });
    const compressedData = pako.deflate(packed);
    const base64Data = btoa(String.fromCharCode(...compressedData));

  return base64Data
  }  

 QRCode.toDataURL(CompressedQR(),opts).then((url) => {
    emailjs
      .send(
        "service_78hl11d",
        "template_8o5otb5",
        { name: formData.name, email: formData.email, phoneNumber: formData.phone, referenceNumber: `${formData.referenceNumber}`, QR : url},
        "vm560Na-jpvQwtapD"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    })
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

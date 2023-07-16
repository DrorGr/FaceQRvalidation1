import React, { useState } from "react";
import { Container } from "@mui/material";
import FaceRecognition from "../Face/FaceRecognition";
import MyForm from "../Form";
import Typography from "@mui/material/Typography";
import VerticalLinearStepper from "../Stepper";
import QRCodeWithDownload from "../QR/QRCodeWithDownload";
import Logic from "../../Logic/Logic";
import * as faceapi from "face-api.js";
import { useEffect } from "react";

function RegistratioPage() {
  const [genQrData, setGenQrData] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setformData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
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
    console.log(formData);
    setformData(formData);
  };

  const myLogic = new Logic();
  const handleLandmarksDetected = (detectedLandmarks) => {
    if (detectedLandmarks.length > 0) {
      compressData(detectedLandmarks);
      setActiveStep(2);
    }
  };

  const compressData = (detectedLandmarks) => {
    setGenQrData(
      myLogic.zip({
        company: "PANGEA",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photoDescriptor: detectedLandmarks[0].descriptor,
      })
    );
  };

  const handleReset = () => {
    console.log("reset");
    setformData({
      name: "",
      email: "",
      phone: "",
    });
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Personal Data Form",
      content: <MyForm onSubmit={handleSubmit} initialFormData={formData} />,
    },
    {
      label: "Face Scanning",
      content: (
        <FaceRecognition onLandmarksDetected={handleLandmarksDetected} />
      ),
    },
    {
      label: "Cryptographic Data",
      content: (
        <>
          {genQrData !== "" && (
            <QRCodeWithDownload value={genQrData} fileName="example-qrcode" />
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Typography
        sx={{ m: 2, fontFamily: "Segoe UI", textAlign: "center" }}
        variant="h4"
      >
        REGISTRATION
      </Typography>
      <Container sx={{ mt: 5 }}>
        <VerticalLinearStepper
          steps={steps}
          // isLandmark={isLandmark}
          reset={handleReset}
          aStep={activeStep}
        />
      </Container>
    </>
  );
}

export default RegistratioPage;

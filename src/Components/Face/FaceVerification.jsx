import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import { SwitchCamera } from '@mui/icons-material';
import * as faceapi from 'face-api.js';
import { useSnackbar } from 'notistack';

const theme = createTheme();

const FaceVerification = ({ photoDescriptor, next }) => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [detected, setDetected] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isFrontCamera ? 'user' : 'environment',
          },
        });
        videoRef.current.srcObject = stream;

        setIsCameraStarted(true);
      } catch (error) {
        console.error(error);
      }
    };

    // const loadModels = async () => {
    //   // const MODEL_URL = process.env.PUBLIC_URL + "/models";
    //   // await Promise.all([
    //   //   faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
    //   //   faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    //   // ]);
    //   startCamera();
    // };

    // loadModels();
    startCamera();

    return () => {
      if (isCameraStarted) {
        stopCamera();
      }
    };
  }, [isCameraStarted, isFrontCamera]);

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    setIsCameraStarted(false);
  };

  const onSwitchCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  useEffect(() => {
    let intervalId;
    if (isCameraStarted) {
      const canvas = canvasRef.current;
      // const context = canvas.getContext('2d');

      const detectFaces = async () => {
        const video = videoRef.current;
        const displaySize = {
          width: video.clientWidth,
          height: video.clientHeight,
        };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        if (detections.length > 0) {
          const videoFaceDescriptor = detections[0].descriptor;
          const photoFaceDescriptor = photoDescriptor;

          const distance = faceapi.euclideanDistance(videoFaceDescriptor, photoFaceDescriptor);
          console.log(distance);
          if (distance < 0.62) {
            // 0.6 is a threshold value, can be adjusted based on accuracy
            setIsCameraStarted(false);
            stopCamera();
            setDetected(true);
            clearInterval(intervalId);
            next();

            enqueueSnackbar('Person Validate Successful', {
              variant: 'success',
              autoHideDuration: 2000,
            });
          }
        }
      };

      intervalId = setInterval(() => {
        detectFaces();
      }, 100);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraStarted]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={2}
        style={{
          placeContent: 'center',
        }}
      >
        <Grid item xs={12} xl={6}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '76.25%',
              border: `solid ${detected ? 'green' : 'red'}`,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                maxWidth: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            />
            {isCameraStarted && (
              <IconButton onClick={onSwitchCamera} style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }} color='primary'>
                <SwitchCamera />
              </IconButton>
            )}
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={detectFaceLandmarks}
            disabled={!isCameraStarted}
          >
            Detect Face Landmarks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconButton color="primary" onClick={onSwitchCamera}>
            <SwitchCamera />
          </IconButton>
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
};

export default FaceVerification;

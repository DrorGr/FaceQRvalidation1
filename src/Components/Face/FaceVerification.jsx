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
  const [color, setColor] = useState('gray');
  const { enqueueSnackbar } = useSnackbar();

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    setIsCameraStarted(false);
    setColor('gray');
    // setImageCaptured('');
    (async function () {
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
    })();

    return () => {
      if (!videoRef.current) return;
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    };
  }, []);

  const onSwitchCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };
  const stopCamera = () => {
    setIsCameraStarted(false);
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

        if (detections?.length > 0) {
          const videoFaceDescriptor = detections[0].descriptor;
          const photoFaceDescriptor = photoDescriptor;

          setColor(
            detections[0]
              ? [
                  'hsl(',
                  (detections[0]?.detection._score * detections[0]?.detection._score * 100).toString(10),
                  ',100%,50%)',
                ].join('')
              : 'red'
          );


          if (detections[0]?.detection?._score > 0.8) {
            setIsCameraStarted(false);
            stopCamera();
            setDetected(true);
            clearInterval(intervalId);
            next();
            enqueueSnackbar('Person Validated', {
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
  }, [ isCameraStarted]);

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
              display: 'flex',
              placeContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              width='fit-content'
              height={200}
              style={{ border: `5px double ${color}`, borderRadius: '10px' }}
            />
            <canvas
              ref={canvasRef}
              width='100%'
              height='100%'
              style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden' }}
            />
            {isCameraStarted && (
              <IconButton onClick={onSwitchCamera} color='primary'>
                <SwitchCamera />
              </IconButton>
            )}
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FaceVerification;

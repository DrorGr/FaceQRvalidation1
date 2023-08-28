import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import { PhotoCamera, SwitchCamera } from '@mui/icons-material';
import * as faceapi from 'face-api.js';

const theme = createTheme();

const FaceRecognition = ({ setFormData, onLandmarksDetected, formData }) => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [color, setColor] = useState('gray');
  const [imageCaptured, setImageCaptured] = useState(false);

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    setImageCaptured(formData.image.length > 0);
  }, [formData.image]);

  useEffect(() => {
    setIsCameraStarted(false);
    setColor('gray');
    setImageCaptured('');
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
  }, [isFrontCamera]);

  const stopCamera = () => {
    setIsCameraStarted(false);
  };

  const onSwitchCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  useEffect(() => {
    let intervalId;

    if (isCameraStarted) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const video = videoRef.current;
      const displaySize = {
        width: video.clientWidth,
        height: video.clientHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      const detectFaces = async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        if (detections[0]?.detection._score > 0.9 && imageCaptured) {
          stopCamera();
          onLandmarksDetected(detections);
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawFaceLandmarks(canvas, detections[0].landmarks);
          setIsCameraStarted(false);
          clearInterval(intervalId);
        }

        setColor(
          detections[0]
            ? ['hsl(', (detections[0]?.detection._score * detections[0]?.detection._score * 100).toString(10), ',100%,50%)'].join(
                ''
              )
            : 'red'
        );
      };

      intervalId = setInterval(() => {
        canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setFormData(() => ({
          ...formData,
          image: canvasRef.current.toDataURL('image/jpeg'),
        }));
        detectFaces();
      }, 300);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCameraStarted, imageCaptured]);

  return (
    <ThemeProvider theme={theme}>
      <Grid>
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
              <>
                <IconButton onClick={onSwitchCamera} color='primary'>
                  <SwitchCamera />
                </IconButton>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FaceRecognition;

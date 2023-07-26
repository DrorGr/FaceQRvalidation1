import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function VerticalLinearStepper({ steps, isLandmark, reset, aStep, sendData }) {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    setActiveStep(aStep);
  }, [aStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleReset = () => {
    reset();
    setActiveStep(0);
  };
  return (
    <Box
      sx={{
        height: '75vh',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        p: 2,
        borderRadius: 5,
      }}
    >
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <span style={{ color: '#071f2a' }}>{step.label}</span>
            </StepLabel>
            <StepContent sx={{ pl: 0, ml: 1, mt: 1 }}>
              {step.content}
              {step.label !== 'Face Scanning' && step.label !== 'QR Scanning' && (
                <Box display='flex' sx={{ mb: 2 }}>
                  {index === 0 && (
                    <Button
                      variant='contained'
                      onClick={index === steps.length - 1 ? handleReset : handleNext}
                      sx={{ mt: 1, ml: -0.4, width: '97%', visibility: index === 0 ? 'visible' : 'hidden' }}
                    >
                      Capture photo
                    </Button>
                  )}
                  {index === 2 && (
                    <Box display='flex' flexDirection='row' width='100%' justifyContent='space-around'>
                      <Button
                        variant='contained'
                        onClick={sendData}
                        sx={{ mt: 1, ml: -0.4, width: '45%', height: 35, backgroundColor: '#294f75' }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant='contained'
                        onClick={handleBack}
                        sx={{ mt: 1, ml: -0.4, width: '45%', height: 35, backgroundColor: '#319ba1' }}
                      >
                        Update
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, backgroundColor: 'transparent', color: '#071f2a' }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    // </ThemeProvider>
  );
}

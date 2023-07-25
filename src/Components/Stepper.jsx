import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#BDBDBD",
    // },
    primary: purple,
  },
});

export default function VerticalLinearStepper({
  steps,
  isLandmark,
  reset,
  aStep,
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    setActiveStep(aStep);
  }, [aStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    reset();
    setActiveStep(0);
  };

  // React.useEffect(() => {
  //   if (activeStep === 1 && isLandmark) {
  //     setActiveStep(2);
  //   }
  // }, [isLandmark]);

  return (
    // <ThemeProvider theme={theme}>
    <Box
      sx={{
        height: "75vh",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        p: 2,
        borderRadius: 5,
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
            //   optional={
            //     index === 2 ? (
            //       <Typography variant="caption">Last step</Typography>
            //     ) : null
            //   }
            >
              <span style={{ color: "#071f2a" }}>{step.label}</span>
            </StepLabel>
            <StepContent>
              {/* <Typography>{step.description}</Typography> */}
              {step.content}
              {step.label !== "Face Scanning" &&
                step.label !== "QR Scanning" && (
                  <Box display="flex" sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      //   onClick={handleNext}
                      onClick={
                        index === steps.length - 1 ? handleReset : handleNext
                      }
                      sx={{ mt: 1, ml: -0.4, width: "97%" }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                  </Box>
                )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          square
          elevation={0}
          sx={{ p: 3, backgroundColor: "transparent", color: "#071f2a" }}
        >
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

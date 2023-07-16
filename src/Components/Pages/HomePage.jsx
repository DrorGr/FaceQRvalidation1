import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  SpatialAudioOff as SpatialAudioOffIcon,
  SpatialTracking as SpatialTrackingIcon,
  SpatialAudio as SpatialAudioIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import video from "../../assets/backgraund/background-video4.mp4";
import VideoBackground from "../VideoBackground";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    // backgroundColor: "#BDBDBD"
  },
});

const pages = [
  {
    title: "REGISTRATION",
    link: "/registration",
    icon: <SpatialAudioOffIcon />,
  },
  { title: "VALIDATION", link: "/validation", icon: <SpatialTrackingIcon /> },
  { title: "MISSING", link: "/missing", icon: <SpatialAudioIcon /> },
];

function HomePage() {
  const classes = useStyles();

  const theme = createTheme();
  const isXsScreen = useMediaQuery("(max-width:600px)");

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: isXsScreen ? "flex-start" : "center",
          marginTop: isXsScreen ? "2vh" : undefined,
          height: "100vh",
        }}
      >
        <VideoBackground src={video} />
        <Container>
          <Grid container spacing={2}>
            {pages.map((page) => (
              <Grid item key={page.title} xs={12} md={4}>
                <Card
                  sx={{
                    bgcolor: "transparent",
                    opacity: 3,
                    "&:hover": {
                      // backgroundColor: "#BDBDBD",
                      backgroundColor: "#424242",
                      opacity: [0.9, 0.8, 0.7],
                    },
                    cursor: "pointer",
                  }}
                >
                  <CardActionArea component="a" href={page.link}>
                    <CardContent className={classes.card} sx={{minHeight:"100px"}}>
                      {React.cloneElement(page.icon, {
                        sx: { fontSize: 100, color: "white" },
                      })}
                      <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        color={"white"}
                      >
                        {page.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;

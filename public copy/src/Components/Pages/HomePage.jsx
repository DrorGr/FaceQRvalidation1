import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import {
  SpatialAudioOff as SpatialAudioOffIcon,
  SpatialTracking as SpatialTrackingIcon,
  SpatialAudio as SpatialAudioIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import video from "../../assets/backgraund/background-video4.mp4";
import logo from "../logo.png";

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
  // { title: "MISSING", link: "/missing", icon: <SpatialAudioIcon /> },
];

function HomePage() {
  const classes = useStyles();

  const theme = createTheme();
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const [checked, setChecked] = React.useState(true);

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
        <Container>
          <Grid container spacing={2} display="flex" justifyContent="center">
            <Grow in={checked} style={{ transitionDelay: "120ms" }}>
              <Box ml={13} mt={3}>
                <img src={logo} alt="logo" style={{ width: "70%" }} />
              </Box>
            </Grow>
            {pages.map((page) => (
              <Grow in={true} style={{ transitionDelay: "320ms" }}>
                <Grid item key={page.title} xs={12} md={4}>
                  <Card
                    sx={{
                      bgcolor: "#071f2a",
                      opacity: 3,
                      "&:hover": {
                        backgroundColor: "#424242",
                        opacity: [0.9, 0.8, 0.7],
                      },
                      cursor: "pointer",
                    }}
                  >
                    <CardActionArea component="a" href={page.link}>
                      <CardContent
                        className={classes.card}
                        sx={{ minHeight: "100px" }}
                      >
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
              </Grow>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;

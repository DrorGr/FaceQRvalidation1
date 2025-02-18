import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import logo from '../logo.jpg';
import { useNavigate } from 'react-router-dom';
import Group from '../../assets/Images/Group.svg';
import Path from '../../assets/Images/Path.svg';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '80px',
    width: '321px',
    margin: '10px',
  },
});

const pages = [
  {
    title: 'Registration',
    link: '/registration',
    icon: Group,
    cardColor: '#156183',
  },
  {
    title: 'Verification',
    link: '/Verification',
    icon: Path,
    cardColor: '#319ba1',
  },
  // { title: "MISSING", link: "/missing", icon: <SpatialAudioIcon /> },
];

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = createTheme();
  const isXsScreen = useMediaQuery('(max-width:600px)');
  const [checked, setChecked] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: isXsScreen ? '2vh' : undefined,
          // height: "100vh",
        }}
      >
        <Container>
          <Grid container spacing={2} gap={2} display='flex' justifyContent='center'>
            <Grow in={checked} style={{ transformOrigin: '0 0 0 0' }} {...(checked ? { timeout: 1000 } : {})}>
              <Box mt={6} ml={2} gap={1} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <img src={logo} alt='logo' style={{ width: '40%' }} />
                <Typography color='#285C7E' fontSize={25}>
                  Certificate Issuing Application
                </Typography>
              </Box>
            </Grow>
            {pages.map((page) => (
              <Grow in={true} style={{ transformOrigin: '0 0 0 0' }} {...(checked ? { timeout: 2000 } : {})}>
                <Grid item key={page.title} xs={12} md={4} display='flex' justifyContent='center'>
                  <Card
                    sx={{
                      bgcolor: page.cardColor,
                      opacity: 3,
                      '&:hover': {
                        backgroundColor: '#424242',
                        opacity: [0.9, 0.8, 0.7],
                      },
                      cursor: 'pointer',
                      borderRadius: '17px',
                    }}
                  >
                    <CardActionArea component='a' onClick={() => navigate(page.link, { replace: true })}>
                      <CardContent className={classes.card}>
                        <img src={page.icon} alt='icon' style={{ marginLeft: '10px' }} />
                        <Typography
                          color={'white'}
                          sx={{
                            fontSize: '2rem',
                            textAlign: 'start',
                            mr: 2,
                          }}
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

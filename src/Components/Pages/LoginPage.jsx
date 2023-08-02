import React, { useState } from 'react';
import {
  InputLabel,
  Box,
  Typography,
  Button,
  Input,
  IconButton,
  FormControl,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../logo.png';
import { userList } from '../../assets/userList/userList';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ username: false, password: false, wrongCredentials: false });
  const [formData, setFormData] = useState({ username: '', password: '' });

  const navigation = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
    error.wrongCredentials && setError({ ...error, wrongCredentials: false });
  };

  const handleSubmit = () => {
    if (formData.username === '' || formData.password === '') {
      setError({ username: !formData.username, password: !formData.password });
    } else {
      const user = userList.find((user) => user.username === formData.username);
      if (user) {
        if (user.password === formData.password) {
          setError({ username: false, password: false });
          navigation('/Home', { replace: true });
        } else {
          setError({ wrongCredentials: true });
        }
      }
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      component='main'
      sx={{ height: window.innerHeight }}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          height: 'fit-content',
          width: '80%',
          bgcolor: '#f5f5f5',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        }}
      >
        <Typography
          mt={5}
          gap={2}
          mb={3}
          color='#294f75'
          fontWeight='bold'
          fontSize={17.5}
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Box
            component='img'
            src={logo}
            sx={{
              height: '60%',
              // width: 170,
            }}
          />
          Certificate Issuing Application
        </Typography>
        <Box
          display='flex'
          height='fit-content'
          flexDirection='column'
          width='inherit'
          gap={2}
          mb={3}
          justifyContent='center'
          alignItems='center'
        >
          <FormControl>
            <InputLabel
              error={error.username}
              required
              sx={{ fontSize: '22px' }}
              variant='standard'
              htmlFor='standard-adornment-username'
            >
              Username
            </InputLabel>
            <Input
              id='standard-adornment-username'
              type='username'
              name='username'
              error={error.username}
              required
              onChange={handleChange}
              variant='standard'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle sx={{ color: error.username && '#d32f2f' }} />
                </InputAdornment>
              }
              sx={{ paddingTop: 1, minWidth: '60vw' }}
            />
            <FormHelperText
              error={error.username}
              sx={{ visibility: error.username ? 'visible' : 'hidden' }}
              id='standard-weight-helper-text'
            >
              Username is required
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel
              error={error.password}
              required
              variant='standard'
              htmlFor='filled-adornment-password'
              sx={{ fontSize: '22px' }}
            >
              Password
            </InputLabel>
            <Input
              id='filled-adornment-password'
              variant='standard'
              label='Password'
              name='password'
              required
              error={error.password}
              onChange={(e) => {
                showPassword && setShowPassword(false);
                handleChange(e);
              }}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position='start'>
                  <LockIcon sx={{ color: error.password && '#d32f2f' }} />
                </InputAdornment>
              }
              sx={{ paddingTop: 1, minWidth: '60vw' }}
            />
            <FormHelperText
              error={error.password}
              sx={{ visibility: error.password ? 'visible' : 'hidden' }}
              id='standard-weight-helper-text'
            >
              'Password is required'
            </FormHelperText>
          </FormControl>
          <Box display='flex' flexDirection='column' width='100%' gap={2} justifyContent='center' alignItems='center'>
            <Button
              // disabled={!formData.password || !formData.username}
              onClick={handleSubmit}
              sx={{
                width: '60vw',
                height: '40px',
                backgroundColor: '#285c7e',
                '&:hover': { backgroundColor: '#285c7e' },
              }}
              variant='contained'
            >
              Log in
            </Button>
            <Typography
              sx={{
                visibility: error.wrongCredentials ? 'visible' : 'hidden',
                color: '#d32f2f',
                fontSize: '22px',
              }}
            >
              Wrong Username or Password
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;

import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const DataField = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  fontSize: '1.2rem',
  color: '#071f2a',
  fontWeight: 'bold',
  padding: '0.25rem',
  borderRadius: '5px',
  margin: '0.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const DataTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  //   fontSize: "1rem",
  color: '#071f2a',
  fontWeight: 'bold',
  width: '40%',
}));

const DataValue = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  //   fontSize: "1rem",
  color: '#071f2a',
  textAlign: 'start',
  width: '60%',
}));

function Summery({ formData }) {
  return (
    <Box display='flex' flexDirection='row' mt={2} mb={2}>
      <Box
        component='img'
        src={formData.image}
        alt='asdasd'
        // width="120px"
        // height="170px"
        sx={{
          height: 150,
          width: 120,
          mt: 1.2,
        }}
      />

      <Grid>
        <DataField>
          <DataTitle>Ref No.:</DataTitle>
          <DataValue>{formData.referenceNumber}</DataValue>
        </DataField>
        <DataField>
          <DataTitle>Date:</DataTitle>
          <DataValue>{new Date().toISOString().slice(0, 10)}</DataValue>
        </DataField>
        <DataField>
          <DataTitle>Name</DataTitle>
          <DataValue>{formData.name}</DataValue>
        </DataField>
        <DataField>
          <DataTitle>Email:</DataTitle>
          <DataValue>{formData.email}</DataValue>
        </DataField>
        <DataField>
          <DataTitle>Phone No.:</DataTitle>
          <DataValue>{`${formData.phone.slice(0, 3)}-${formData.phone.slice(3)}`}</DataValue>
        </DataField>
      </Grid>
    </Box>
  );
}

export default Summery;

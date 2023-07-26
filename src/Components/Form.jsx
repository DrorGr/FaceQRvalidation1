import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';

const MyForm = ({ onSubmit, formData, setFormData }) => {
  useEffect(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form style={{ padding: '10px' }}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} xl={3}>
          <TextField
            name='name'
            label='Name'
            type='name'
            value={formData.name}
            onChange={handleChange}
            margin='normal'
            fullWidth
            autoFocus
            InputLabelProps={{ style: { color: '#071f2a' } }}
            InputProps={{ style: { color: '#071f2a' } }}
          />
        </Grid>
        <Grid item xs={12} xl={3}>
          <TextField
            name='email'
            label='Email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            margin='normal'
            fullWidth
            InputLabelProps={{ style: { color: '#071f2a' } }}
            InputProps={{ style: { color: '#071f2a' } }}
          />
        </Grid>
        <Grid item xs={12} xl={3}>
          <TextField
            name='phone'
            label='Phone'
            type='tel'
            value={formData.phone}
            onChange={handleChange}
            margin='normal'
            fullWidth
            InputLabelProps={{ style: { color: '#071f2a' } }}
            InputProps={{ style: { color: '#071f2a' } }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;

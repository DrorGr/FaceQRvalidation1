import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";

const MyForm = ({ onSubmit, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);

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
    <form style={{ outline: "1px solid #ccc", padding: "10px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} xl={3}>
          <TextField
            name="name"
            label="Name"
            type="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            autoFocus
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            style={{ color: "white" }}
          />
        </Grid>
        <Grid item xs={12} xl={3}>
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            style={{ color: "white" }}
          />
        </Grid>
        <Grid item xs={12} xl={3}>
          <TextField
            name="phone"
            label="Phone"
            type="tel"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            style={{ color: "white" }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;

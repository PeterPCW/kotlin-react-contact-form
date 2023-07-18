import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send the form data to the backend function
    const formData = {
      name,
      email,
      message,
    };

    // Perform the API call to the backend function using fetch or axios
    // Replace <backend-url> with the actual URL of your backend function
    fetch('<backend-url>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend function
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'left',
        margin: '16px',
        maxWidth: '616px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '2%'}} >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{maxWidth: '400px', minWidth: "33%"}}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{width: "auto", minWidth: "65%"}}
        />
      </Box>
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" type="submit" sx={{ maxWidth: '200px'}}>
        Reach Out
      </Button>
    </Box>
  );
};

export default ContactForm;

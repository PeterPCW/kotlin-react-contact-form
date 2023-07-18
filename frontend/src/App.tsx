import React from 'react';
import './App.css';
import ContactForm from "./components/ContactForm"
import CustomLink from "./components/CustomLink"
import { linkData } from "./data/linkData";
import { Grid, Typography, CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1 className='title'>
        Future Home of Byte Plus Bit
      </h1>
      <Box display="flex">
        <Box flexGrow={1} p={4} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="subtitle1" component="h2" gutterBottom>
            For now, send me your project and cofounder requests, or browse my links below
          </Typography>
          <ContactForm />
          <Typography variant="body1" component="h4" gutterBottom>
            Thanks for visiting!
          </Typography>
        </Box>
        <Box flexGrow={2} display="flex" justifyContent="center" alignItems="center">
          <img src={'./byte+bit.png'} alt="logo" style={{ objectFit: 'cover', width: '100%', height: '100%', maxWidth: '23vw' }} />
        </Box>
      </Box>
      <Box p={4}>
        <Grid container spacing={2} style={{ alignItems: 'stretch', maxWidth: '87vw' }}>
          {linkData.map((link, index) => (
            <Grid item xs={3} key={index}>
              <CustomLink loading={false} preview={link} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;

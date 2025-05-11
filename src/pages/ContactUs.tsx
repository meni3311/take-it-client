import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ContactUs: React.FC = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6a0dad',
      },
      secondary: {
        main: '#d8b6ff',
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen transition-transform duration-300">
      <Header />

      <main className="flex-grow p-4 container mx-auto max-w-3xl">
        <ThemeProvider theme={theme}>
          <Container>
            <Box textAlign="center" my={5}>
              <Typography variant="h3" color="primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="h6" color="textSecondary">
                We'd love to hear from you! Fill out the form below and we'll get back to you soon.
              </Typography>
            </Box>

            <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={3}>
              <TextField label="Name" variant="outlined" fullWidth required />
              <TextField label="Email" variant="outlined" fullWidth required type="email" />
              <TextField label="Subject" variant="outlined" fullWidth />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
              />
              <Box textAlign="center">
                <Button variant="contained" color="primary" size="large">
                  Send Message
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;

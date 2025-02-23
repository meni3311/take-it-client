import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Users: React.FC = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6a0dad', // Purple color
      },
      secondary: {
        main: '#d8b6ff', // Light purple
      },
    },
  });

  return (
    <div className={`flex flex-col min-h-screen transition-transform duration-300 $`}>
      <Header />

      <main className="flex-grow bg-gray-100 p-4 container mx-auto max-w-full">
        <ThemeProvider theme={theme}>
          <Container maxWidth="md">
            <Box textAlign="center" my={5}>
              <Typography variant="h3" color="primary" gutterBottom>
                How Can We Help You?
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Find answers to your questions below, or reach out to our support team.
              </Typography>
            </Box>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                <Typography variant="h6" color="primary">
                  How Does the Payment System Work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A payment system is a way to transfer money from one person or organization to another. It involves banks, credit card companies, and merchants.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                <Typography variant="h6" color="primary">
                  How Do I Cancel My Account?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    <li>Go to our website and sign in.</li>
                    <li>Click on your profile and select "Account Settings."</li>
                    <li>Scroll down and click "Cancel Account."</li>
                    <li>Confirm by entering your password.</li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Container>
        </ThemeProvider>
      </main>


      <Footer />
    </div>
  );
};

export default Users;
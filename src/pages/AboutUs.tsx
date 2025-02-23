import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container, Typography, Box, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AboutUs: React.FC = () => {

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
    <div className={`flex flex-col min-h-screen transition-transform duration-300 $`}>
      <Header />

      <main className="flex-grow p-4 container mx-auto max-w-4xl">
        <ThemeProvider theme={theme}>
          <Container>
            <Box textAlign="center" my={5}>
              <Typography variant="h3" color="primary" gutterBottom>
                About Us
              </Typography>
            </Box>

            <Box textAlign="center">
              <img src='about.png' alt="About Us" width="100%" />
            </Box>

            <Typography variant="h6" color="textSecondary" textAlign="center" mt={3}>
              We are a group of innovative, experienced, and proficient teams. You will love to collaborate with us.
            </Typography>

            <Box textAlign="center" my={5}>
              <Typography variant="h3" color="primary" gutterBottom>
                Our Team
              </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {[
                { name: 'Flora Nyra', role: 'Product Manager', img: 'about-pic-1.jpg' },
                { name: 'Evander Mac', role: 'Art Director', img: 'about-pic-2.jpg' },
                { name: 'Taytum Elia', role: 'Investment Planner', img: 'about-pic-4.jpg' },
                { name: 'Wylder Elio', role: 'Financial Analyst', img: 'about-pic-3.jpg' },
              ].map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardMedia component="img" height="250" image={member.img} alt={member.name} />
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {member.role}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

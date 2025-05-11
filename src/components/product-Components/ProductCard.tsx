import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box,
  MobileStepper,
} from '@mui/material';
import {
  EditOutlined,
  Delete,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { Site } from '../../redux/usersSlice';

interface ProductCardProps {
  site: Site;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ site, onEdit, onDelete }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = site.images?.length || 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          backgroundColor: '#f5f5f5',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            {site.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Address:</strong> {site.address}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Coordinates:</strong>{' '}
            {Array.isArray(site.coordinates)
              ? site.coordinates.join(', ')
              : site.coordinates}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Status:</strong> {site.status}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Creation Date:</strong>{' '}
            {new Date(site.creationDate).toLocaleDateString()}
          </Typography>

          {site.images && site.images.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {site.images.map((image: string, index: number) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`site-image-${index}`}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </SwipeableViews>
              <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                }
                backButton={
                  <IconButton
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                }
              />
            </Box>
          )}

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <IconButton
              onClick={onDelete}
              sx={{
                color: '#7c4dff',
                '&:hover': { color: '#ab47bc' },
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={onEdit}
              sx={{
                color: '#7c4dff',
                '&:hover': { color: '#ab47bc' },
              }}
            >
              <EditOutlined />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;

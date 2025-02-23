import React, { useEffect, useRef, useState } from 'react';
import { createSite, uploadImage } from '../server/app';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, Input } from '@mui/material';

interface PopUpCardCreateSiteProps {
  onClose: () => void;
  loadSite: boolean;
  setLoadSite: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpCardCreateSite: React.FC<PopUpCardCreateSiteProps> = ({
  onClose,
  setLoadSite,
  loadSite,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitudeCoordinate, setLatitudeCoordinate] = useState<number>();
  const [longitudeCoordinate, setLongitudeCoordinate] = useState<number>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closePopUp = (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', closePopUp);
    return () => {
      document.removeEventListener('mousedown', closePopUp);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleImagePreview = () => {
    return selectedImages.map((image, index) => (
      <Grid key={index} item xs={4} sm={3} md={2}>
        <img
          src={URL.createObjectURL(image)}
          alt={`preview-${index}`}
          className="w-full h-20 object-cover rounded-md"
        />
      </Grid>
    ));
  };

// Update your handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !address || !latitudeCoordinate || !longitudeCoordinate) return;

  try {
    // Upload images first
    const imageUrls = await Promise.all(
      selectedImages.map(async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        
        const response = await uploadImage(formData);
        return response.data.imageUrl;
      })
    );

    // Create site with image URLs
    const siteData = {
      name,
      address,
      coordinates: [longitudeCoordinate, latitudeCoordinate],
      images: imageUrls,
      creationDate: new Date(),
      lastUpdated: null,
    };
    
    await createSite(siteData);
    setLoadSite(!loadSite);
    onClose();
  } catch (error) {
    console.error('Error creating site:', error);
    alert('Error uploading images. Please try again.');
  }
};

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Site</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Latitude Coordinate"
                variant="outlined"
                fullWidth
                value={latitudeCoordinate}
                onChange={(e) => setLatitudeCoordinate(parseFloat(e.target.value))}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Longitude Coordinate"
                variant="outlined"
                fullWidth
                value={longitudeCoordinate}
                onChange={(e) => setLongitudeCoordinate(parseFloat(e.target.value))}
                required
              />
            </Grid>

            {/* Image upload section */}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Upload Images:
              </Typography>
              <Input
                type="file"
                inputProps={{
                  multiple: true,
                  accept: 'image/*',
                }}
                onChange={handleImageChange}
                fullWidth
              />
              <Grid container spacing={2} mt={2}>
                {handleImagePreview()}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpCardCreateSite;

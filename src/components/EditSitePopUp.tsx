import React, { useState, Dispatch, SetStateAction } from "react";
import { updateSite } from '../server/app';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Typography, Grid } from '@mui/material';

interface EditSitePopUpProps {
  site: {
    _id: string;
    name: string;
    address: string;
    coordinates: [number, number];
    pictures: string[];
  };
  onClose: () => void;
  setLoadSite: Dispatch<SetStateAction<boolean>>;
  loadSite: boolean;
}

const EditSitePopUp: React.FC<EditSitePopUpProps> = ({ site, onClose, setLoadSite, loadSite }) => {
  const [name, setName] = useState(site.name);
  const [address, setAddress] = useState(site.address);
  const [latitude, setLatitude] = useState<any>(site.coordinates[1]);
  const [longitude, setLongitude] = useState<any>(site.coordinates[0]);
  const [pictures, setPictures] = useState(site.pictures);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  // Preview images
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

  // Submit form including images
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSiteData = {
      name,
      address,
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      lastUpdated: new Date(),
      pictures: [...pictures], // Assuming you handle picture URLs or IDs separately
    };

    // Upload the selected images (if any)
    if (selectedImages.length > 0) {
      try {
        // Add your image upload logic here
        const uploadedImages = await uploadImages(selectedImages); // Implement this function based on your backend
        updatedSiteData.pictures = [...updatedSiteData.pictures, ...uploadedImages];
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }

    try {
      await updateSite(site._id, updatedSiteData);
      onClose();
    } catch (error) {
      console.error("Error updating site:", error);
    } finally {
      setLoadSite(!loadSite);
    }
  };

  const uploadImages = async (images: File[]) => {
    // Implement the upload logic (e.g., using FormData to send the images to a server)
    // Returning a placeholder response
    return images.map((image) => URL.createObjectURL(image)); // This should be replaced with actual image URL returned from the server
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Site</DialogTitle>
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
                label="Latitude"
                variant="outlined"
                fullWidth
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Longitude"
                variant="outlined"
                fullWidth
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Upload Images:</Typography>
              <Input
                type="file"
                inputProps={{
                  multiple: true, // Allow multiple file selection
                  accept: "image/*" // Only accept image files
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSitePopUp;

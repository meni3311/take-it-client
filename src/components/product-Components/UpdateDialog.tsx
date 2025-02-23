import {
    Grid,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Button,
    Input,
  } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    selectedImages: File[];
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddressChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onLatitudeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onLongitudeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    renderImagePreview: () => JSX.Element[];
    // Two handlers are passed as props to keep your logic intact.
    onSubmit: (e: FormEvent) => void;
    onAlternateSubmit: (e: FormEvent) => void;
  }
  
  const UpdateDialog: React.FC<UpdateModalProps> = ({
    open,
    onClose,
    name,
    address,
    latitude,
    longitude,
    selectedImages,
    onNameChange,
    onAddressChange,
    onLatitudeChange,
    onLongitudeChange,
    onImageChange,
    renderImagePreview,
    onSubmit,
    onAlternateSubmit,
  }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Site</DialogTitle>
        <DialogContent>
          <form onSubmit={onAlternateSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={onNameChange}
              required
              margin="normal"
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={onAddressChange}
              required
              margin="normal"
            />
            <TextField
              label="Latitude"
              variant="outlined"
              fullWidth
              value={latitude}
              onChange={onLatitudeChange}
              required
              margin="normal"
            />
            <TextField
              label="Longitude"
              variant="outlined"
              fullWidth
              value={longitude}
              onChange={onLongitudeChange}
              required
              margin="normal"
            />
            <Input
              type="file"
              inputProps={{ multiple: true, accept: 'image/*' }}
              onChange={onImageChange}
              fullWidth
              style={{ marginTop: 16 }}
            />
            <Grid container spacing={2} mt={2}>
              {renderImagePreview()}
            </Grid>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={onSubmit} type="submit" color="primary" variant="contained">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdateDialog;
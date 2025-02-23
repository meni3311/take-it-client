import {
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
  } from '@mui/material';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    error: string | null;
  }
  
  const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, loading, error }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            Are you sure you want to delete this site? This action cannot be undone.
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 2,
            pb: 2,
            px: 3,
          }}
        >
          <Button variant="contained" color="error" onClick={onConfirm} disabled={loading} fullWidth>
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} disabled={loading} fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default DeleteDialog;
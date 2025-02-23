import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { EditOutlined, Delete } from '@mui/icons-material';
import { Site } from '../../redux/usersSlice';

interface ProductCardProps {
    site: Site;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  const ProductCard: React.FC<ProductCardProps> = ({ site, onEdit, onDelete }) => {
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
              {Array.isArray(site.coordinates) ? site.coordinates.join(', ') : site.coordinates}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              <strong>Status:</strong> {site.status}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              <strong>Creation Date:</strong> {new Date(site.creationDate).toLocaleDateString()}
            </Typography>
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
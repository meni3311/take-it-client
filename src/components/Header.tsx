import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { purple } from '@mui/material/colors';
import { useAtom } from 'jotai';
import { userAtom } from '../redux/atoms';

const Header = () => {
  const [user] = useAtom(userAtom);
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(45deg, ${purple[700]}, ${purple[500]})`,
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '8px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Sidebar Toggle Button */}
        <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* Animated Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/products"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            takeIt
          </Typography>
        </motion.div>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['AboutUs', 'Products', 'FAQs', 'Contact'].map((text) => (
            <motion.div key={text} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Typography
                component={Link}
                to={`/${text.toLowerCase()}`}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: '0.3s',
                  '&:hover': { color: '#90CAF9' },
                }}
              >
                {text}
              </Typography>
            </motion.div>
          ))}
        </Box>

        {/* Logout Button */}
        <IconButton color="inherit" onClick={() => setShowModal(true)}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {['Users', 'Map'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Logout Dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleLogOut}>
            Confirm Logout
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;

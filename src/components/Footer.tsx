import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Open and close dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Footer Component */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-700 to-purple-500 text-white flex flex-col sm:flex-row justify-between items-center p-6 shadow-lg"
      >
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <motion.h2 
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-lg font-semibold hover:text-gray-200"
          >
            makeIt
          </motion.h2>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                href="#"
                className="text-white hover:text-gray-300"
              >
                <Icon fontSize="large" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 items-center">
          
          {/* Contact Us Button (Opens Dialog) */}
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }}
          >
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ borderRadius: "20px", fontSize: "0.9rem", textTransform: "none" }}
              onClick={handleOpen}
            >
              Contact Us
            </Button>
          </motion.div>

          <motion.h3 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
            className="text-sm flex gap-2 items-center"
          >
            TAKEIT Cycke © 2025
          </motion.h3>
        </div>
      </motion.footer>

      {/* Contact Us Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" />
          <TextField label="Email" fullWidth margin="dense" />
          <TextField label="Message" multiline rows={4} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleClose} color="primary" variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;

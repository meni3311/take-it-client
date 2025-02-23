import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Table from '../components/Table';
import PopUpCardCreate from '../components/PopUpCardCreate';
import DownloadUserList from '../components/DownloadUserList';
import SearchUsers from '../components/SearchUsers';
import { Button, Container, Box } from '@mui/material';
import { Add, CloudDownload } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Users: React.FC = () => {
  const [isCardVisible, setCardVisible] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [isDownloadPopupVisible, setIsDownloadPopupVisible] = useState<boolean>(false);

  const showCard = () => {
    setCardVisible(true);
  };

  const hideCard = () => {
    setCardVisible(false);
  };

  const handleUserCreated = () => {
    setTableKey(prevKey => prevKey + 1);
    hideCard();
  };

  const showDownloadPopup = () => setIsDownloadPopupVisible(!isDownloadPopupVisible);

  return (
    <div className="flex flex-col min-h-screen transition-all duration-300">
      <Header />

      <main className="flex-grow bg-gray-100 py-4">
        <Container maxWidth="xl">
          <Box
            className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between items-center mb-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #3b82f6, #9333ea)',
                  color: 'white',
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.5)"
                }}
                startIcon={<Add />}
                onClick={showCard}
              >
                Add User
              </Button>
            </motion.div>

            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:ml-4 md:flex-wrap">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #3b82f6, #9333ea)',
                    color: 'white',
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    textTransform: "none",
                    boxShadow: "0px 5px 15px rgba(147, 51, 234, 0.5)"
                  }}
                  startIcon={<CloudDownload />}
                  onClick={showDownloadPopup}
                >
                  Download List
                </Button>
              </motion.div>

              <div className="w-full md:w-auto mt-2 md:mt-0">
                <SearchUsers />
              </div>
            </div>
          </Box>

          {isDownloadPopupVisible && (
            <DownloadUserList setIsDownloadPopupVisible={setIsDownloadPopupVisible} />
          )}

          {isCardVisible && (
            <PopUpCardCreate onClose={hideCard} onUserCreated={handleUserCreated} />
          )}

          <Box
            className="container mx-auto bg-white shadow-md rounded-lg p-6 max-w-full"
          >
            <Table key={tableKey} />
          </Box>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Users;

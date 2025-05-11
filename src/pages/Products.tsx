import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchSite from '../components/SearchSite';
import PopUpCardCreateSite from '../components/PopUpCardCreateSite';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
    const [popUpCreateSite, setPopUpCreateSite] = useState(false);
    const [product, setProduct] = useState(false);

    return (
        <div className={`flex flex-col min-h-screen transition-all duration-300`}>
            <Header />

            <main className="flex-grow bg-gray-100 p-4 container mx-auto max-w-full">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:justify-between items-center mb-4">
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
                            onClick={() => setPopUpCreateSite(true)}
                        >
                            Add Product
                        </Button>
                    </motion.div>
                    {popUpCreateSite && (
                        <PopUpCardCreateSite onClose={() => {
                            setPopUpCreateSite(false)
                            window.location.reload()
                        }} />
                    )}
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:ml-4 md:flex-wrap">

                        <div className="w-full md:w-auto mt-2 md:mt-0">
                            <SearchSite />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto bg-white shadow-md rounded-lg p-6 max-w-full">
                    <ProductList product={product} setProduct={setProduct} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Products;

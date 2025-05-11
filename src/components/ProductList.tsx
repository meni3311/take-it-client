import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { SyncLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchSites } from '../redux/usersSlice';
import {
  Grid,
} from '@mui/material';
import axios from 'axios';
import { updateSite } from '../server/app';
import ProductCard from './product-Components/ProductCard';
import DeleteDialog from './product-Components/DeleteDialog';
import UpdateDialog from './product-Components/UpdateDialog';

interface TableSideProps {
  product: boolean;
  setProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

// ================= TableSide (Parent) Component =================
const TableSide: React.FC<TableSideProps> = ({ product, setProduct }) => {
  // State for modals and selected site ID
  const [showPopUpUpdate, setShowPopUpUpdate] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  // State for deletion process
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<string | null>(null);

  // Form state for updating a site
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const sites = useSelector((state: RootState) =>
    state.sites.filteredSites && state.sites.filteredSites.length > 0
      ? state.sites.filteredSites
      : state.sites.sites
  );
  const loading = useSelector((state: RootState) => state.sites.loading);
  const error = useSelector((state: RootState) => state.sites.error);

  // Fetch sites on mount or when product changes
  useEffect(() => {
    dispatch(fetchSites()).then((result) => {
      console.log('Fetched Sites:', result);
    });
  }, [dispatch, product]);

  // ---------------- Delete Handler ----------------
  const handleDeleteProduct = async (siteId: string) => {
    setLoadingDelete(true);
    try {
      await axios.delete(`http://localhost:3000/api/product/deleteProduct/${siteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDeleteDialog(false);
      setSelectedSiteId(null);
      setProduct(!product);
    } catch (err) {
      setErrorDelete('Failed to delete the Product');
      console.error('Error deleting Product:', err);
    } finally {
      setLoadingDelete(false);
    }
  };

  // ---------------- Image Preview & Change Handlers ----------------
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  // ---------------- Update Handlers ----------------
  // First update handler using updateSite from '../server/app'
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedSiteData = {
      name,
      address,
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      lastUpdated: new Date(),
    };

    try {
      await updateSite(selectedSiteId, updatedSiteData);
      setShowPopUpUpdate(false);
    } catch (error) {
      console.error('Error updating site:', error);
    } finally {
      setProduct(!product);
    }
  };

  // Second update handler using axios directly
  const handleUpdateSite = async (e: FormEvent) => {
    e.preventDefault();
    const updatedSiteData = {
      name,
      address,
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      lastUpdated: new Date(),
    };

    try {
      await axios.put(`http://localhost:3000/api/product/updateProduct/${selectedSiteId}`, updatedSiteData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setShowPopUpUpdate(false);
      setProduct(!product);
    } catch (error) {
      console.error('Error updating site:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Grid container spacing={4}>
        {sites.length > 0 ? (
          sites.map((site) => (
            <ProductCard
              key={site._id}
              site={site}
              onDelete={() => {
                setSelectedSiteId(site._id);
                setDeleteDialog(true);
              }}
              onEdit={() => {
                setSelectedSiteId(site._id);
                // Pre-fill the form with the current site's details
                setName(site.name);
                setAddress(site.address);
                if (Array.isArray(site.coordinates)) {
                  setLongitude(site.coordinates[0].toString());
                  setLatitude(site.coordinates[1].toString());
                } else {
                  setLongitude('');
                  setLatitude('');
                }
                setShowPopUpUpdate(true);
              }}
            />
          ))
        ) : (
          <div className="w-full text-center py-4 text-sm sm:text-base">No sites found.</div>
        )}
      </Grid>
      <UpdateDialog
        open={showPopUpUpdate}
        onClose={() => setShowPopUpUpdate(false)}
        name={name}
        address={address}
        latitude={latitude}
        longitude={longitude}
        selectedImages={selectedImages}
        onNameChange={(e) => setName(e.target.value)}
        onAddressChange={(e) => setAddress(e.target.value)}
        onLatitudeChange={(e) => setLatitude(e.target.value)}
        onLongitudeChange={(e) => setLongitude(e.target.value)}
        onImageChange={handleImageChange}
        renderImagePreview={handleImagePreview}
        onSubmit={handleSubmit}
        onAlternateSubmit={handleUpdateSite}
      />
      <DeleteDialog
        open={showDeleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={() => selectedSiteId && handleDeleteProduct(selectedSiteId)}
        loading={loadingDelete}
        error={errorDelete}
      />
      {loading && (
        <div className="flex items-center justify-center">
          <SyncLoader color="#87ab65" margin={6} size={30} />
        </div>
      )}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
    </div>
  );
};

export default TableSide;

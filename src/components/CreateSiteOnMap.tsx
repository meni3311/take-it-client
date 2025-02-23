import React, { useState } from 'react';
import PopUpCardCreateSite from './PopUpCardCreateSite';

interface PopupProps {
  onClose: () => void;
  position: { x: number; y: number };
  coordinates: {lat: number, lng: number};
  loadSite: boolean;
  setLoadSite: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSitePopup: React.FC<PopupProps> = ({ onClose, position, coordinates, setLoadSite, loadSite}) => {
  const [showCartPopup, setShowCartPopup] = useState(false);


  return (
    <div
      style={{ top: position.y, left: position.x }}
      className="absolute bg-white border rounded shadow-lg p-4"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Site</h2>
      <p className="text-gray-700 mb-6">Would you like to create a new site?</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowCartPopup(true);
          }}
        >
          Create Site
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {showCartPopup &&
        <PopUpCardCreateSite
          onClose={() => setShowCartPopup(false)}
          loadSite={loadSite}
          setLoadSite={setLoadSite}
          x={coordinates.lat}
          y={coordinates.lng}
        />}
    </div>
  );
};

export default CreateSitePopup;

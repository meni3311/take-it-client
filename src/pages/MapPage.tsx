import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import CreateSitePopup from '../components/CreateSiteOnMap';

const MapPage: React.FC = () => {
  const [showSiteModal, setShowSiteModal] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapRightClick = (coords: { lat: number; lng: number }, pixelPosition: { x: number; y: number }) => {
    setPopupPosition(pixelPosition);
    setMapCoordinates(coords);
    setShowSiteModal(true);
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-transform duration-300`}>
      <Header />

      <div className="flex flex-1 overflow-hidden">

        <main className="flex-grow min-w-[300px]">
          <div className="h-full">
            <Map onMapRightClick={handleMapRightClick} />
          </div>
        </main>
      </div>

      <Footer />

      {/* Create Site Popup */}
      {showSiteModal && popupPosition && mapCoordinates && (
        <CreateSitePopup
          onClose={() => setShowSiteModal(false)}
          position={popupPosition}
          coordinates={mapCoordinates}
        />
      )}

      {/* Logout Modal - Keep existing implementation */}
    </div>
  );
};

export default MapPage;
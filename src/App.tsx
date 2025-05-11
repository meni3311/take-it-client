// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Users from "./pages/Users";
import Login from "./pages/Login";
import Otp from './pages/Otp';
import NotFound from './components/NotFound';
import { Provider } from "react-redux";
import store from './redux/store';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import MapPage from './pages/MapPage';
import ContactUs from './pages/contactUs';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/faqs" element={<Faqs/>} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapPage/>} />
          
          {/* Unprotected /login/otp route */}
          <Route path="/login/otp" element={<Otp />} />
          {/* Unprotected /users route */}
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
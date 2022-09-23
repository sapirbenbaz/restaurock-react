import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './addNewRestaurant.css';
import axios from 'axios';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  zIndex: 1000,
  width: '750px',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

export default function AddNewRestaurant({ open, onClose }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');

  const submitAddNewRestaurant = () => {
    const restaurantsUrl = 'http://localhost:8000/restaurants';
    const json = {
      name: restaurantName,
      address: address,
      city: city,
      phoneNumber: phoneNumber,
      website: website,
    };

    axios
      .post(restaurantsUrl, json, { crossdomain: true })
      .then(() => {
        onClose();
      });
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="closeBtn">
          <button onClick={onClose}>X</button>
        </div>
        <div className="addNewRestaurant">
          <h2>Add new Restaurant</h2>
          <form>
            <label>Restaurant Name</label>
            <input
              type="text"
              required
              value={restaurantName}
              onChange={(e) => {
                setRestaurantName(e.target.value);
              }}
            />
            <label>Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <label>City</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label>Phone Number</label>
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <label>Website</label>
            <input
              type="text"
              required
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
            <button onClick={submitAddNewRestaurant}>Submit</button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

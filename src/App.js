import React from 'react';
import {} from '@frontegg/react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Menu from './pages/Menu';
import { Routes, Route } from 'react-router-dom';
import Reservations from './pages/Reservations';
import Giveaway from './pages/Giveaway';
import Takeaway from './pages/Takeaway';
import SuccessfulGiveaway from './pages/successfulGiveaway';
import { useAuth } from '@frontegg/react';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="center">
      <Navbar />
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="reservations">
            <Route index={true} element={<Reservations />} />
            <Route path="giveaway" element={<Giveaway />} />
            <Route path="takeaway" element={<Takeaway />} />
          </Route>
          <Route
            path="sucessful-giveaway"
            element={<SuccessfulGiveaway />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;

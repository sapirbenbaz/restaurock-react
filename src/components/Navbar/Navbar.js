import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';
import './Navbar.css';
import { Button } from '../Button';
import { AdminPortal, useAuth } from '@frontegg/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogin = () => {
    window.location.href = '/account/login';
  };

  const handleLogout = () => {
    window.location.href = '/account/logout';
  };

  const showAdminPortal = () => {
    AdminPortal.show();
  };

  return (
    <nav className="NavbarItems">
      <h1 onClick={() => navigate('/')} className="navbar-logo">
        Restaurock
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {NavbarItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
        <Button className="settings" onClick={showAdminPortal}>
          Settings
        </Button>
      </ul>
      {!isAuthenticated ? (
        <Button onClick={handleLogin}>Login/Register</Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </nav>
  );
};

export default Navbar;

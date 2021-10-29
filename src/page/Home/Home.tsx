import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>This is auth page</p>
      <Link to='/'>Back to Home Page</Link>
    </header>
  );
};

export default HomePage;

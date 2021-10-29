import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Link to='/auth'>Sign In</Link>
    </header>
  );
};

export default HomePage;

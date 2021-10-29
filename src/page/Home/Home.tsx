import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Title</title>
        <meta name='description' content='Home page for react starter' />
      </Helmet>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to='/auth'>Sign In</Link>
      </header>
    </>
  );
};

export default HomePage;

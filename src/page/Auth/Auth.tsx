import React, { FunctionComponent } from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

const Auth = () => {
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

Auth.asyncData = async () => {
  return await axios.get(
    'https://mocki.io/v1/937f945f-c492-4785-9c42-fa889556e64e'
  );
};

export default Auth;

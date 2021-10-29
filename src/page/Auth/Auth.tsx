import React, { ComponentProps } from 'react';
import axios from 'axios';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hook/useAsyncData';

const Auth = ({ staticContext }: ComponentProps<any>) => {
  const { data } = useAsyncData(staticContext, Auth.asyncData);

  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>{JSON.stringify(data)}</p>
      <p>This is auth page</p>
      <Link to='/'>Back to Home Page</Link>
    </header>
  );
};

Auth.asyncData = async () => {
  return await axios.get(
    'https://mocki.io/v1/937f945f-c492-4785-9c42-fa889556e64e'
  );
};

export default Auth;

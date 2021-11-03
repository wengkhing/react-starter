import React, { ComponentProps } from 'react';
import { Helmet } from 'react-helmet-async';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hook/useAsyncData';
import axios from '../../helper/api';

const Auth = (prop: ComponentProps<any>) => {
  const data = useAsyncData(prop.staticContext, Auth.asyncData);

  return (
    <>
      <Helmet>
        <title>Auth Title</title>
        <meta name='description' content='Auth page for react starter' />
      </Helmet>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{JSON.stringify(data)}</p>
        <p>This is auth page</p>
        <Link to='/'>Back to Home Page</Link>
      </header>
    </>
  );
};

Auth.asyncData = async () => {
  return await axios.get(
    'https://mocki.io/v1/937f945f-c492-4785-9c42-fa889556e64e',
    {
      requestKey: 'get-mock-data',
      isInterruptive: true,
    }
  );
};

export default Auth;

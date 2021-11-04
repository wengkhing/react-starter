import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <HelmetProvider>
        <StaticRouter>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </Provider>
  );
  const linkElement = screen.getByText(/save to reload/i);
  expect(linkElement).toBeInTheDocument();
});

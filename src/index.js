import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-ruom0snyt2jy.frontegg.com',
};

ReactDOM.render(
  <BrowserRouter>
    <FronteggProvider
      contextOptions={contextOptions}
      withCompanyName={false}
    >
      <App />
    </FronteggProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

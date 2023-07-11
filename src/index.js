import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter  } from "react-router-dom";

import App from './App';
import AuthProviders from './providers/AuthProviders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviders>
        <ChakraProvider>
          <App /> 
        </ChakraProvider>
      </AuthProviders>
    </BrowserRouter>
  </React.StrictMode>
);

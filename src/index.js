import React from 'react';
import ReactDOM from 'react-dom/client';

import './global.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

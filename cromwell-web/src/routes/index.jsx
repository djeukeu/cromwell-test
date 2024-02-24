import React from 'react';
import Home from 'src/pages/Home';
import Landing from 'src/pages/Landing';
import NotFound from 'src/pages/NotFound';
import authRoutes from './auth';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

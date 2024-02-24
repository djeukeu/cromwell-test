import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthLayout from 'src/layouts/Auth';
import Auth from 'src/pages/Auth';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';

const authRoutes = [
  {
    path: 'auth',
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
];

export default authRoutes;

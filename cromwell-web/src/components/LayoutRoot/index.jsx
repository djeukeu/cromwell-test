import React from 'react';
import { styled } from '@mui/material/styles';

const Layout = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundImage: 'url("/assets/svg/gradient-bg.svg")',
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  height: '100%',
}));

const LayoutRoot = (props) => {
  return <Layout>{props.children}</Layout>;
};

export default LayoutRoot;

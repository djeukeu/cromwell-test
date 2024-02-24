import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import LayoutRoot from 'src/components/LayoutRoot';
import Logo from 'src/components/Logo';
import { TOP_HEIGHT } from 'src/constants';

const AuthLayout = (props) => {
  return (
    <LayoutRoot>
      <Box
        component="header"
        sx={{
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} sx={{ height: TOP_HEIGHT }}>
            <Box
              sx={{
                display: 'inline-flex',
                height: 126,
                width: 126,
              }}>
              <Logo />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
        }}>
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}>
          {props.children}
        </Container>
      </Box>
    </LayoutRoot>
  );
};

export default AuthLayout;

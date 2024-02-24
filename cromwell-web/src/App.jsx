import React, { Fragment, useEffect } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import LayoutRoot from './components/LayoutRoot';
import Logo from './components/Logo';
import { authenticate, tryAuthenticate } from './redux-store/reducers/users';
import routes from './routes';
import { getToken } from './utils/token';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-notifications/lib/notifications.css';

const App = () => {
  const appRoutes = useRoutes(routes);
  const dispatch = useDispatch();
  const didTryLogin = useSelector((state) => state.user.didTryLogin);

  useEffect(() => {
    const tryLogin = async () => {
      const token = getToken();
      if (token) {
        dispatch(authenticate({ token }));
      } else {
        dispatch(tryAuthenticate());
      }
    };
    if (!didTryLogin) {
      tryLogin();
    }
  }, [didTryLogin, dispatch]);

  return (
    <Fragment>
      {!didTryLogin ? (
        <LayoutRoot>
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
              <Logo />
              <CircularProgress />
            </Container>
          </Box>
        </LayoutRoot>
      ) : (
        appRoutes
      )}
      <NotificationContainer />
      <CssBaseline />
    </Fragment>
  );
};

export default App;

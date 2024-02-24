import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from 'src/components/Logo';
import RouterLink from 'src/components/RouterLink';
import { TOP_HEIGHT } from 'src/constants';
import { getUserInfoAction } from 'src/redux-store/actions/user';

const Landing = () => {
  const userInfo = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    } else {
      setLoading(true);
      dispatch(getUserInfoAction()).then(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/svg/gradient-bg.svg")',
        display: 'flex',
        flex: '1 1 auto',
        pt: '120px',
      }}>
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
                height: 250,
                width: 250,
              }}>
              <Logo />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg">
        {loading ? (
          <CircularProgress />
        ) : (
          <Box maxWidth="sm">
            <Typography variant="h3" sx={{ mb: 2 }}>
              Welcome {userInfo?.fullname},
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: 500,
              }}>
              Thank you for giving me the opportunity to showcase my skills and
              I hope my test solution is up to Cromwell&apos;s expectations for
              the fullstack node.js developer role.
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ my: 3 }}>
              <Button
                component={RouterLink}
                href={'/home'}
                sx={(theme) =>
                  theme.palette.mode === 'dark'
                    ? {
                        backgroundColor: 'neutral.50',
                        color: 'neutral.900',
                        '&:hover': {
                          backgroundColor: 'neutral.200',
                        },
                      }
                    : {
                        backgroundColor: 'neutral.900',
                        color: 'neutral.50',
                        '&:hover': {
                          backgroundColor: 'neutral.700',
                        },
                      }
                }
                variant="contained">
                Get Started
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Landing;

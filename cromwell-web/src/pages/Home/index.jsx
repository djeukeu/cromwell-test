import React, { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import {
  IconButton,
  Toolbar,
  Typography,
  ListItemButton,
  Divider,
  List,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DRAWER_WIDTH } from 'src/constants';
import { getUserInfoAction } from 'src/redux-store/actions/user';

const items = [
  {
    icon: <DashboardIcon />,
    label: 'Dashboard 1',
  },
  {
    icon: <PeopleIcon />,
    label: 'Nav 1',
  },
  {
    icon: <PeopleIcon />,
    label: 'Nav 2',
  },
  {
    icon: <PeopleIcon />,
    label: 'Nav 3',
  },
  {
    icon: <PeopleIcon />,
    label: 'Nav 4',
  },
  {
    icon: <PeopleIcon />,
    label: 'Nav 5',
  },
];

const Home = () => {
  const userInfo = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createdOn = moment(userInfo?.createdAt).format(
    'MMMM Do YYYY, h:mm:ss a'
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  if (!token) {
    return <Navigate to={'/auth/login'} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {items.map((item, index) => {
            return (
              <ListItemButton key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom>
                  Your account details
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>User name</TableCell>
                      <TableCell>{userInfo?.fullname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{userInfo.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{userInfo.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Account Created on</TableCell>
                      <TableCell>{createdOn}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

import React from 'react';
import { Button, Card, CardHeader, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Card elevation={16}>
        <CardHeader sx={{ pb: 0 }} title="Cromwell Developer Test" />
        <CardContent>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={() => {
              navigate('/auth/register');
            }}
            variant="contained">
            Register
          </Button>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={() => {
              navigate('/auth/login');
            }}
            variant="contained">
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;

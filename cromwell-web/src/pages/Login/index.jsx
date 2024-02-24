import React, { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Link,
  Card,
  CardHeader,
  Typography,
  TextField,
  Stack,
  CardContent,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouterLink from 'src/components/RouterLink';
import { ErrorContext } from 'src/context/ErrorProvider';
import { loginAction } from 'src/redux-store/actions/user';
import * as yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(255)
    .required('Password is required'),
});

const Login = () => {
  const errCtx = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(loginAction(values.email, values.password))
        .then(() => {
          navigate('/');
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          errCtx.setError(err?.message);
        });
    },
  });

  return (
    <Card elevation={16}>
      <CardHeader
        subheader={
          <Typography color="text.secondary" variant="body2">
            Don&apos;t have an account? &nbsp;
            <Link
              href={'/auth/register'}
              component={RouterLink}
              underline="hover"
              variant="subtitle2">
              Register
            </Link>
          </Typography>
        }
        sx={{ pb: 0 }}
        title="Login"
      />
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
          </Stack>
          <LoadingButton
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            loading={loading}
            type="submit"
            variant="contained"
            disabled={loading}>
            Log In
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;

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
  FormHelperText,
  Box,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouterLink from 'src/components/RouterLink';
import { ErrorContext } from 'src/context/ErrorProvider';
import { registerAction } from 'src/redux-store/actions/user';
import * as yup from 'yup';

const initialValues = {
  username: '',
  email: '',
  address: '',
  password: '',
  confirm_password: '',
  policy: false,
};

const validationSchema = yup.object({
  username: yup.string().required('User name is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  address: yup.string().required('Address is required'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(255)
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  policy: yup
    .boolean()
    .oneOf(
      [true],
      'You will need to read and accept the terms and conditions.'
    ),
});

const Register = () => {
  const errCtx = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        registerAction(
          values.username,
          values.email,
          values.address,
          values.password
        )
      )
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
    <>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  href={'/auth/login'}
                  component={RouterLink}
                  underline="hover"
                  variant="subtitle2">
                  Login
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Register"
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="User name"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.username}
                />
                <TextField
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
                  error={!!(formik.touched.address && formik.errors.address)}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="Address"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.address}
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
                <TextField
                  error={
                    !!(
                      formik.touched.confirm_password &&
                      formik.errors.confirm_password
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                  label="Confirm Password"
                  name="confirm_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirm_password}
                />
              </Stack>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  ml: -1,
                  mt: 1,
                }}>
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography color="text.secondary" variant="body2">
                  I have read the{' '}
                  <Link component="a" href="#">
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {!!(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              <LoadingButton
                size="large"
                fullWidth
                sx={{ mt: 2 }}
                loading={loading}
                type="submit"
                variant="contained"
                disabled={loading}>
                Create Account
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;

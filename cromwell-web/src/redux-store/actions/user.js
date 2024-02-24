import config from 'src/config';
import { saveToken } from 'src/utils/token';
import { getUserInfo, login, register } from '../reducers/users';

// Login API endpoint
export const loginAction = (email, password) => {
  return async (dispatch) => {
    const body = JSON.stringify({
      email,
      password,
    });
    const options = {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${config.api_url}user/login`, options);
    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes?.code);
    }
    const resData = await response.json();
    dispatch(login({ user: resData?.user, token: resData?.token }));
    saveToken(resData?.token);
  };
};

// Register API endpoint
export const registerAction = (fullname, email, address, password) => {
  return async (dispatch) => {
    const body = JSON.stringify({
      fullname,
      email,
      address,
      password,
    });
    const options = {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${config.api_url}user/register`, options);
    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes?.code);
    }
    const resData = await response.json();
    dispatch(register({ user: resData?.user, token: resData?.token }));
    saveToken(resData?.token);
  };
};

// fetch user details API endpoint
export const getUserInfoAction = () => {
  return async (dispatch, getState) => {
    const user = getState().user;
    const options = {
      method: 'GET',
      headers: { authorization: `Bearer ${user?.token}` },
    };
    const response = await fetch(`${config.api_url}user`, options);
    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes?.code);
    }
    const resData = await response.json();
    dispatch(getUserInfo({ user: resData?.user }));
  };
};

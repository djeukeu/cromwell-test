import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    token: '',
    didTryLogin: null,
  },
  reducers: {
    authenticate: (state, action) => {
      return {
        ...state,
        token: action.payload?.token,
        didTryLogin: true,
      };
    },
    tryAuthenticate: () => {
      return {
        didTryLogin: true,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        token: action.payload?.token,
        user: action.payload?.user,
      };
    },
    register: (state, action) => {
      return {
        ...state,
        token: action.payload?.token,
        user: action.payload?.user,
      };
    },
    getUserInfo: (state, action) => {
      return {
        ...state,
        user: action.payload?.user,
      };
    },
  },
});

export const { getUserInfo, login, register, authenticate, tryAuthenticate } =
  userSlice.actions;

export default userSlice;

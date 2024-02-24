import store from 'store';

const key = 'userToken';

export const getToken = () => {
  const token = store.get(key);
  return token;
};

export const saveToken = (token) => {
  store.set(key, token);
};

export const clearToken = () => {
  store.remove(key);
};

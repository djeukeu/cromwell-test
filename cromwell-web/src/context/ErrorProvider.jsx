import React, { createContext, useCallback } from 'react';
import { NotificationManager } from 'react-notifications';

const errorHandler = (error) => {
  switch (error) {
    case 'USER_NOT_FOUND':
      return {
        message: 'User account does exist',
      };
    case 'WRONG_PASSWORD':
      return {
        message: 'Account password is incorrect',
      };
    case 'USER_ALREADY_EXIST':
      return {
        message: 'Account with this credential already exist',
      };
    default:
      return {
        code: error,
        message: 'Server error. Unknown error',
      };
  }
};

export const ErrorContext = createContext({
  setError: () => {},
});

const ErrorProvider = (props) => {
  const setError = useCallback((code) => {
    const { message } = errorHandler(code);
    NotificationManager.error(message, 'Error!', 6000);
  }, []);

  return (
    <ErrorContext.Provider
      value={{
        setError,
      }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;

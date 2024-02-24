import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorProvider from './context/ErrorProvider';
import store from './redux-store';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ErrorProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorProvider>
  </BrowserRouter>
);

import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/reactotronConfig';
import Routes from './routes';
import Header from './components/Header';
import GlobalStyle from './styles/global';
import history from './services/history';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;

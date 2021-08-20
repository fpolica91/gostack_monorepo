import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import './config/reactotronConfig';
import {Provider} from 'react-redux';
import store from './store/index';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Routes />
      </Provider>
    </>
  );
};

export default App;

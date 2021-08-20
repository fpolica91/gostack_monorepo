import React from 'react';
import './config/reactotronConfig';
import { StatusBar } from 'react-native';
import Routes from './routes';

console.tron.log('hllooo');

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}

// export default App;

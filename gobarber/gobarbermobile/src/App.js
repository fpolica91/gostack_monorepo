import React from 'react';
import {useSelector} from 'react-redux';
import createRouter from './routes';
// import { Container } from './styles';

export default function RouteApp() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRouter(signed);
  return <Routes />;
}

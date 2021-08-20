/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  //   process.env.NODE_ENV === 'development'
  __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleWare = createSagaMiddleware({
  sagaMonitor,
});
const enhancer = __DEV__
  ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleWare))
  : applyMiddleware(sagaMiddleWare);

const store = createStore(rootReducer, enhancer);

sagaMiddleWare.run(rootSaga);
export default store;

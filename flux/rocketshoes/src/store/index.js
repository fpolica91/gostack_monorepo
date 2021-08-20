import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor
});

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer, enhancer);

// THIS IS USED TO RUN SAGA
sagaMiddleware.run(rootSaga);
export default store;

import React from 'react'
import './config/reactotron'
import Routes from './routes/index'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import { Router } from 'react-router-dom'
import history from './services/history'
import GlobalStyle from './styles/global'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App

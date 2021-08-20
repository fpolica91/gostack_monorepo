import React from 'react'
import '~/config/reactotronConfig'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import { ToastContainer } from 'react-toastify'
import GlobalStyle from './styles/global'
import Routes from './Routes/index'
import history from './services/history'

function App  () {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={3000} />
          </Router>
        </PersistGate>
      </Provider>
    </>
  )
}



export default App

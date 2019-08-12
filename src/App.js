import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { history } from 'utils/history'
import { PersistGate } from 'redux-persist/integration/react'

import './App.css'
import configureStore from 'utils/store'

import Routes from 'containers/pages'


const App = () => {
  if (localStorage.getItem('username') !== null) {
    window.Intercom('boot', {
      app_id: window.INTERCOM_APP_ID,
      name:  localStorage.getItem('username'),
      email: localStorage.getItem('user_email'),
    })
  } else {
    window.Intercom('boot', {
      app_id: window.INTERCOM_APP_ID,
    })
  }

  const { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <ConnectedRouter
          history={history}>
            <Routes />
          </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

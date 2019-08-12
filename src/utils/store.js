import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { history } from './history'
// import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import reduxReset from 'redux-reset'

import storage from 'redux-persist/lib/storage'
import rootReducer from 'reducers'
import rootSaga from 'sagas'


const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['uploadFile']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const logger = createLogger()
const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
  // logger
)

const enahanceCreateStore = compose(
  middleware,
  reduxReset('RESET_APP')
)(createStore)

const store = enahanceCreateStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store }

export default () => {
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}

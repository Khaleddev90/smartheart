import { combineReducers } from 'redux'
import {reducer as notifications} from 'react-notification-system-redux';

import UI from './UI'
import uploadFile from './uploadFile'
import publishProduct from './publishProduct'
import searchProducts from './searchProducts'
import auth from './auth'
import dashboard from './dashboard'

const appReducer = combineReducers({
  UI,
  uploadFile,
  publishProduct,
  searchProducts,
  dashboard,
  auth,
  notifications,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_email')
    setTimeout(() => state = undefined, 700)
  }
  return appReducer(state, action)
}

export default rootReducer
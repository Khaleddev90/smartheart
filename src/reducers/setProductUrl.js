import { createAction, handleActions } from 'redux-actions'

const initialState = {
  isProductUrlSet: false,
  isProductLoading: false,
  isProductUrlRequested: false,
  error: null
}

export const SET_PRODUCT_URL_REQUEST = 'SET_PRODUCT_URL_REQUEST'
export const SET_PRODUCT_URL_SUCCESS = 'SET_PRODUCT_URL_SUCCESS'
export const SET_PRODUCT_URL_FAILURE = 'SET_PRODUCT_URL_FAILURE'

export const DELETE_PRODUCT_URL_REQUEST = 'DELETE_PRODUCT_URL_REQUEST'
export const DELETE_PRODUCT_URL_SUCCESS = 'DELETE_PRODUCT_URL_SUCCESS'
export const DELETE_PRODUCT_URL_ERROR = 'DELETE_PRODUCT_URL_ERROR'

export const RESET_PRODUCT_BOX = 'RESET_PRODUCT_BOX'
export const UNSET_ITEM = 'UNSET_ITEM'

export const setProductUrl = createAction(SET_PRODUCT_URL_REQUEST, (url, selectedItem) => ({url, selectedItem}))
export const resetProductBox = createAction(RESET_PRODUCT_BOX)
export const deleteProductUrl = createAction(DELETE_PRODUCT_URL_REQUEST, url => url)

export default handleActions({

  SET_PRODUCT_URL_REQUEST: state => ({
    ...state,
    isProductLoading: true,
    isProductUrlRequested: true
  }),

  SET_PRODUCT_URL_SUCCESS: state => ({
    ...initialState
  }),

  SET_PRODUCT_URL_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  RESET_PRODUCT_BOX: state => ({
    ...initialState
  }),

  DELETE_PRODUCT_URL_SUCCESS: (state, { payload: id }) => ({
    ...state,
    deletedVideo: id
  }),

  DELETE_PRODUCT_URL_ERROR: (state, { payload: error }) => ({
    ...state,
    deletedVideo: error
  }),

}, initialState)

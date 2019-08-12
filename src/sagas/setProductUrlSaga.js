import { doSetProductUrl, deleteProductUrl } from 'utils/api'
import { call, put, select } from 'redux-saga/effects'

import {
  SET_PRODUCT_URL_SUCCESS,
  SET_PRODUCT_URL_FAILURE,
  RESET_PRODUCT_BOX,
  DELETE_PRODUCT_URL_SUCCESS,
  DELETE_PRODUCT_URL_ERROR,
} from 'reducers/setProductUrl'

import { TOGGLE_POPUP } from 'reducers/UI'
import { UPDATE_NEW_PRODUCT } from 'reducers/publishProduct'

export const getVideoId = state => state.uploadFile.postedVideo.id

export function* setProductUrl({ payload:  data }) {
  const { url, selectedItem } = data
  const id = yield select(getVideoId)

  try {

    const result = yield call(doSetProductUrl, url, id)
    const { data } = result
    yield put({ type: UPDATE_NEW_PRODUCT, selectedItem, data })
    yield put({ type: SET_PRODUCT_URL_SUCCESS })
  } catch (error) {
    yield put({ type: SET_PRODUCT_URL_FAILURE, payload: error })
    yield put({ type: TOGGLE_POPUP, payload: { type: 'error', isToggled: true }})
    yield put({ type: RESET_PRODUCT_BOX })
  }
}

export function* deleteProductUrlSaga({ payload: url }) {
  const videoId = yield select(getVideoId)
  try {
    yield call(deleteProductUrl, url, videoId)
    yield put({ type: DELETE_PRODUCT_URL_SUCCESS, payload: videoId })
  } catch (error) {
    yield put({ type: DELETE_PRODUCT_URL_ERROR, payload: error })
  }
}
import { call, put, select, all } from 'redux-saga/effects'
import { doPublishProduct, doSetProduct, doMissingProduct } from 'utils/api'

import {
  PUBLISH_PRODUCT_SUCCESS,
  PUBLISH_PRODUCT_FAILURE,
  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_FAILURE,
  MISSING_PRODUCT_SUCCESS,
  MISSING_PRODUCT_FAILURE,
} from 'reducers/publishProduct'

import {
  addPendingVideo,
} from 'reducers/dashboard'

export const getVideoId = state => state.uploadFile.postedVideo.id


export function* publishProduct({ payload: { title, description } }) {
  const videoId = yield select(getVideoId);
  const pendingVideo = {videoId, title, description};
  try {
    yield call(doPublishProduct, videoId, title, description);
    yield all([
      put(addPendingVideo(pendingVideo)),
      put({ type: PUBLISH_PRODUCT_SUCCESS }),
    ])
  } catch (error) {
    yield put({ type: PUBLISH_PRODUCT_FAILURE, payload: error })
  }
}

export function* setProductTag({ payload: productData }) {
  try {
    const videoId = yield select(getVideoId);
    for (const p in productData) {
      const { data } = yield call(doSetProduct, videoId, productData[p].id);
      yield put({ type: SET_PRODUCT_SUCCESS, payload: data })
    }
  } catch (error) {
    yield put({ type: SET_PRODUCT_FAILURE, payload: error })
  }
}

export function* missingProductTag({ payload: productData }) {
  try {

    const videoId = yield select(getVideoId);

    console.log('test2')
    console.log(JSON.stringify(productData) + 'videoid' + videoId)

    for (const p in productData) {
      const { data } = yield call(doMissingProduct, videoId, productData[p].name, productData[p].colour, productData[p].stylecode, productData[p].notes, productData[p].file);
      console.log('missing product' + JSON.stringify(data))
      yield put({ type: MISSING_PRODUCT_SUCCESS, payload: data })
    }
  } catch (error) {
    console.log('missing fail' + JSON.stringify(error))
    yield put({ type: MISSING_PRODUCT_FAILURE, payload: error })
  }
}
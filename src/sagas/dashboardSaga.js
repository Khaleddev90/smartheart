import { call, put, select, all, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { map, filter, isEmpty } from 'lodash';
import { fetchVideos, doFetchFollowers, doFetchFollowings } from 'utils/api'
import { doPublishProduct } from 'utils/api'
import {
  FETCH_VIDEOS_SUCCESS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  FETCH_FOLLOWINGS_SUCCESS,
  FETCH_FOLLOWINGS_FAILURE,
  FETCH_VIDEOS_ERROR,
  CHANGE_VIDEO_TITLE_SUCCESS,
  CHANGE_VIDEO_TITLE_FAILURE,
  removePendingVideo,
} from 'reducers/dashboard'

const userIdSelector = state => state.auth.userInfo.id;

export const getPendingVideos = state => state.dashboard.pendingVideos;

function getReadyVideos(videos, pendingList) {
  return filter(videos, (v) => pendingList.findIndex(pendingVideo => pendingVideo.videoId === v.id) !== -1)
}

export function* fetchVideosSaga({ payload: id }) {
  try {
    const userId = yield select(userIdSelector)
    const pendingVideos = yield select(getPendingVideos)
    const { data: { results } } = yield call(fetchVideos, userId)
    const readyVideos = getReadyVideos(results, pendingVideos)
    if (pendingVideos.length && !isEmpty(readyVideos)) {
      yield all(map(readyVideos, (video) => put(removePendingVideo(video.id))))
    } else if (pendingVideos.length) {
      yield delay(5000)
      yield fork(fetchVideosSaga, { payload: id })
    }
    yield put({ type: FETCH_VIDEOS_SUCCESS, payload: results })
  } catch (error) {
    yield put({ type: FETCH_VIDEOS_ERROR, payload: error })
  }
}

export function* changeVideoTitle({ payload: { id, title, description } }) {
  try {
    const result = yield call(doPublishProduct, id, title, description)
    yield put({ type: CHANGE_VIDEO_TITLE_SUCCESS, payload: result.data })
  } catch (error) {
    yield put({ type: CHANGE_VIDEO_TITLE_FAILURE, payload: error })
  }
}

export function* fetchFollowers() {
  try {
    const userId = yield select(userIdSelector)
    const {data} = yield call(doFetchFollowers, userId)
    yield put({ type: FETCH_FOLLOWERS_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: FETCH_FOLLOWERS_FAILURE, payload: error })
  }  
}

export function* fetchFollowings() {
  try {
    const userId = yield select(userIdSelector)
    const {data} = yield call(doFetchFollowings, userId)
    yield put({ type: FETCH_FOLLOWINGS_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: FETCH_FOLLOWINGS_FAILURE, payload: error })
  }  
}
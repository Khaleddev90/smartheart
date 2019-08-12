import { call, put, take, fork, select, race } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import { UPLOAD_FILE_CANCEL } from 'reducers/uploadFile'
import { doUploadFile, doPublishProduct, doDeleteVideo } from 'utils/api'

import {
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_PUBLISH_SUCCESS,
  UPLOAD_FILE_PUBLISH_ERROR,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILURE,
  uploadFileProgress
} from 'reducers/uploadFile'

export const getVideoId = state => state.uploadFile.postedVideo.id

export function* uploadFilePublishSaga({ payload: { id, title } }) {
  try {
    const { data } = yield call(doPublishProduct, id, title)
    yield put({ type: UPLOAD_FILE_PUBLISH_SUCCESS, payload: { id, data } })
  } catch (error) {
    yield put({ type: UPLOAD_FILE_PUBLISH_ERROR, payload: { id, error } })
  }
}

export function* deleteVideo() {
  try {
    const id = yield select(getVideoId)
    if(id) {
      yield call(doDeleteVideo, id)
    }
    yield put({ type: DELETE_VIDEO_SUCCESS })
  } catch (error) {
    yield put({ type: DELETE_VIDEO_FAILURE })
  }
}

function createUploader(file) {
  let emit
  const chan = eventChannel((emitter) => {
    emit = emitter
    return () => {}
  })

  const onUploadProgress = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total)
    emit(percentage)
    if (percentage === 100) emit(END)
  }

  const uploadPromise = doUploadFile(file, onUploadProgress)
  return [uploadPromise, chan]
}

function* uploadProgressWatcher(chan) {
  while (true) { // eslint-disable-line no-constant-condition
    const progress = yield take(chan)
    yield put(uploadFileProgress(progress))
  }
}

function* uploadTask(file) {
  try {
    const [uploadPromise, chan] = yield call(createUploader, file)
    yield fork(uploadProgressWatcher, chan)
    const { data } = yield call(() => uploadPromise)
    yield put({ type: UPLOAD_FILE_SUCCESS, payload: data })
  } catch (e) {
    yield put({ type: UPLOAD_FILE_FAILURE, payload: e })
  }
}

export function* uploadFile({ payload: { file }}) {
  yield race({
    task: call(uploadTask, file),
    cancel: take(UPLOAD_FILE_CANCEL)
  })
}

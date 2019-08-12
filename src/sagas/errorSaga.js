import { put, take, fork, call } from 'redux-saga/effects';
import Notifications from 'react-notification-system-redux';
import { togglePopup } from 'reducers/UI';
import { CHANGE_VIDEO_TITLE_FAILURE, FETCH_VIDEOS_SUCCESS, fetchVideos, clearDashboard } from 'reducers/dashboard';
import { PUBLISH_PRODUCT_FAILURE } from 'reducers/publishProduct';
import { UPLOAD_FILE_FAILURE } from 'reducers/uploadFile';
import { AUTH_SUCCESS, AUTH_FAILURE, SESSION_TIMEOUT, SESSION_TIMEOUT_CLEAR } from 'reducers/auth';

function* tokenFlow() {
  const message = 'Session timeout. Please try again.';
  yield put(togglePopup({
    type: 'login',
    isToggled: true,
    message,
  }));
  yield put({ type: AUTH_FAILURE, payload: message });
  yield put({ type: SESSION_TIMEOUT });
  while (true) {
    yield take(AUTH_SUCCESS);
    yield put(clearDashboard());
    yield put(fetchVideos());
    yield take(FETCH_VIDEOS_SUCCESS);
    yield put({ type: SESSION_TIMEOUT_CLEAR });
  }
}

function* otherFlow(payload) {
  while (true) {
    const action = yield take([CHANGE_VIDEO_TITLE_FAILURE, PUBLISH_PRODUCT_FAILURE, UPLOAD_FILE_FAILURE]);
    let message = {
      title: 'Unknown error',
      message: 'Reload the page and try again.',
    };
    if (payload.response.status > 401 && payload.response.status < 500) {
      message = {
        ...message,
        title: payload.response.data.detail,
      }
    } else {
      switch (action.type) {
        case CHANGE_VIDEO_TITLE_FAILURE:
          message = {
            title: 'Error saving new video title',
            message: 'Reload the page and try again.',
          };
          break;
        case PUBLISH_PRODUCT_FAILURE:
          message = {
            title: 'Error publishing video',
            message: 'Our team has been notified of this, please try uploading your video again.',
          };
          break;
        case UPLOAD_FILE_FAILURE:
          message = {
            title: 'Error uploading video',
            message: 'Please reload the page and try again.',
          };
          break;
        default:
          break;
      }
    }
    yield put(Notifications.error({
      ...message,
      position: 'tr',
      autoDismiss: 0,
    }));
  }
}

export function* errorSaga({ payload }) {
  if (payload.response.status === 401) {
    yield call(tokenFlow);
  } else {
    yield fork(otherFlow, payload);
  }
}

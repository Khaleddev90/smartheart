import { createAction, handleActions } from 'redux-actions'
import { unionBy } from 'lodash';

const initialState = {
  videos: null,
  pendingVideos: [],
  error: null,
  isFetchVideos: false,
  isVideoChanged: false,
  isSessionTimeout: false,
  followers: [],
  followings: [],
  currentPage: 0,
}

export const FETCH_VIDEOS = 'FETCH_VIDEOS'
export const FETCH_VIDEOS_ERROR = 'FETCH_VIDEOS_ERROR'
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS'

export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS'
export const FETCH_FOLLOWERS_SUCCESS = 'FETCH_FOLLOWERS_SUCCESS'
export const FETCH_FOLLOWERS_FAILURE = 'FETCH_FOLLOWERS_FAILURE'

export const FETCH_FOLLOWINGS = 'FETCH_FOLLOWINGS'
export const FETCH_FOLLOWINGS_SUCCESS = 'FETCH_FOLLOWINGS_SUCCESS'
export const FETCH_FOLLOWINGS_FAILURE = 'FETCH_FOLLOWINGS_FAILURE'

export const CHANGE_VIDEO_TITLE_REQUEST = 'CHANGE_VIDEO_TITLE_REQUEST'
export const CHANGE_VIDEO_TITLE_SUCCESS = 'CHANGE_VIDEO_TITLE_SUCCESS'
export const CHANGE_VIDEO_TITLE_FAILURE = 'CHANGE_VIDEO_TITLE_FAILURE'

export const CLEAR_DASHBOARD = 'CLEAR_DASHBOARD'

export const ADD_PENDING_VIDEOS = 'ADD_PENDING_VIDEOS'
export const REMOVE_PENDING_VIDEOS = 'REMOVE_PENDING_VIDEOS'

export const SELECTPAGE = 'SELECTPAGE'

export const fetchVideos = createAction(FETCH_VIDEOS)
export const clearDashboard = createAction(CLEAR_DASHBOARD)
export const changeVideoTitle = createAction(CHANGE_VIDEO_TITLE_REQUEST, (id, title, description) => ({ id, title, description }))
export const addPendingVideo = createAction(ADD_PENDING_VIDEOS, (pendingVideo) => ({ pendingVideo }))
export const removePendingVideo = createAction(REMOVE_PENDING_VIDEOS, (id) => ({ id }))
export const fetchFollowers = createAction(FETCH_FOLLOWERS)
export const fetchFollowings = createAction(FETCH_FOLLOWINGS)
export const selectPage = createAction(SELECTPAGE, (pageIndex) => ({ pageIndex }))
export default handleActions({

  SELECTPAGE: (state, { payload: { pageIndex } }) => ({
    ...state,
    currentPage: pageIndex //0 uploading, 1 uploads, 2 followers, 3 following, 4 earning, 5 settings
  }),

  FETCH_VIDEOS: (state, payload) => ({
    ...state,
    isFetchVideos: false
  }),

  FETCH_VIDEOS_SUCCESS: (state, { payload: result }) => ({
    ...state,
    videos: result,
    isFetchVideos: true
  }),

  FETCH_VIDEOS_ERROR: (state, { payload }) => ({
    ...state,
    error: payload,
  }),

  FETCH_FOLLOWERS_SUCCESS: (state, { payload: result }) => ({
    ...state,
    followers: result,
  }),

  FETCH_FOLLOWERS_FAILURE: (state, { payload }) => ({
    ...state,
    error: payload,
  }),

  FETCH_FOLLOWINGS_SUCCESS: (state, { payload: result }) => ({
    ...state,
    followings: result,
  }),

  FETCH_FOLLOWINGS_FAILURE: (state, { payload }) => ({
    ...state,
    error: payload,
  }),

  CLEAR_DASHBOARD: state => ({
    ...state,
    videos: null,
    error: null,
  }),

  CHANGE_VIDEO_TITLE_SUCCESS: (state, { payload: result }) => {
    return {
    ...state,
    isVideoChanged: true,
    videos: unionBy([result], state.videos, 'id'),
  }},

  CHANGE_VIDEO_TITLE_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  ADD_PENDING_VIDEOS: (state, { payload: { pendingVideo } }) => ({
    ...state,
    pendingVideos: [...state.pendingVideos, pendingVideo]
  }),

  REMOVE_PENDING_VIDEOS: (state, { payload: { id } }) => {
    return {
    ...state,
    pendingVideos: [
      ...state.pendingVideos.slice(0, state.pendingVideos.findIndex(pendingVideo => pendingVideo.videoId === id)),
      ...state.pendingVideos.slice(state.pendingVideos.findIndex(pendingVideo => pendingVideo.videoId === id) + 1)
    ]
  }}

}, initialState)

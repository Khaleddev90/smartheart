import { createAction, handleActions } from 'redux-actions'

const initialState = {
  isFileUploaded: false,
  isFileUploading: false,
  filePublishing: {
    isPublished: false,
    videoId: null,
    changes: {},
    error: null
  },
  postedVideo: {},
  progress: 0,
  error: null,
}

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const UPLOAD_FILE_CANCEL = 'UPLOAD_FILE_CANCEL'
export const UPLOAD_FILE_PUBLISH = 'UPLOAD_FILE_PUBLISH'
export const UPLOAD_FILE_PUBLISH_SUCCESS = 'UPLOAD_FILE_PUBLISH_SUCCESS'
export const UPLOAD_FILE_PUBLISH_ERROR = 'UPLOAD_FILE_PUBLISH_ERROR'
export const UPLOAD_FILE_PROGRESS_UPDATE = 'UPLOAD_FILE_PROGRESS_UPDATE'
export const UPLOAD_CLEAN = 'UPLOAD_CLEAN'
export const UPLOAD_FILE_PROGRESS = 'UPLOAD_FILE_PROGRESS'

export const DELETE_VIDEO_REQUEST = 'DELETE_VIDEO_REQUEST'
export const DELETE_VIDEO_SUCCESS = 'DELETE_VIDEO_SUCCESS'
export const DELETE_VIDEO_FAILURE = 'DELETE_VIDEO_FAILURE'

export const uploadFile = createAction(UPLOAD_FILE_REQUEST)
export const uploadFileCancel = createAction(UPLOAD_FILE_CANCEL)
export const uploadFilePublish = createAction(UPLOAD_FILE_PUBLISH, (id, title) => ({id, title}))
export const uploadFileProgressUpdate = createAction(UPLOAD_FILE_PROGRESS_UPDATE)
export const uploadClean = createAction(UPLOAD_CLEAN)
export const uploadFileProgress = createAction(UPLOAD_FILE_PROGRESS)
export const deleteVideo = createAction(DELETE_VIDEO_REQUEST)

export default handleActions({
  UPLOAD_FILE_REQUEST: state => ({
    ...state,
    isFileUploaded: false,
    isFileUploading: true
  }),

  UPLOAD_FILE_SUCCESS: (state, { payload: video }) => ({
    ...state,
    isFileUploaded: true,
    postedVideo: video,
  }),

  UPLOAD_FILE_PROGRESS: (state, { payload: progress }) => ({
    ...state,
    progress: progress
  }),

  UPLOAD_FILE_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  UPLOAD_FILE_PUBLISH_SUCCESS: (state, { payload: id, data }) => ({
    ...state,
    filePublishing: {
      isPublished: true,
      videoId: id,
      changes: data,
      error: null
    },
  }),

  UPLOAD_FILE_PUBLISH_ERROR: (state, { payload: id, error }) => ({
    ...state,
    filePublishing: {
      isPublished: false,
      videoId: id,
      changes: {},
      error: error
    },
  }),

  UPLOAD_FILE_PROGRESS_UPDATE: (state, { payload: progress }) => ({
    ...state,
    progress
  }),

  UPLOAD_CLEAN: state => ({
    ...initialState,
  }),

  DELETE_VIDEO_SUCCESS: state => ({
    ...state
  }),

  DELETE_VIDEO_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),
}, initialState)

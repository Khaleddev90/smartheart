import { createAction, handleActions } from 'redux-actions'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS'
export const REGISTER_REQUEST_FAILURE = 'REGISTER_REQUEST_FAILURE'

export const BIRTHDATE_REQUEST = 'BIRTHDATE_REQUEST'
export const BIRTHDATE_REQUEST_SUCCESS = 'BIRTHDATE_REQUEST_SUCCESS'
export const BIRTHDATE_REQUEST_FAILURE = 'BIRTHDATE_REQUEST_FAILURE'

export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE'

export const GET_RECOMMANDED = 'GET_RECOMMANDED'
export const GET_RECOMMANDED_SUCCESS = 'GET_RECOMMANDED_SUCCESS'
export const GET_RECOMMANDED_FAILURE = 'GET_RECOMMANDED_FAILURE'

export const FOLLOW_USER = 'FOLLOW_USER'
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'

export const UNFOLLOW_USER = 'UNFOLLOW_USER'
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'

export const CHECK_USERNAME = 'CHECK_USERNAME'
export const CHECK_USERNAME_SUCCESS = 'CHECK_USERNAME_SUCCESS'
export const CHECK_USERNAME_FAILURE = 'CHECK_USERNAME_FAILURE'

export const FB_REGISTER = 'FB_REGISTER'
export const FB_REGISTER_SUCCESS = 'FB_REGISTER_SUCCESS'
export const FB_REGISTER_FAILURE = 'FB_REGISTER_FAILURE'

export const LOG_OUT = 'LOG_OUT'

export const CLEAR_ERROR = 'CLEAR_ERROR'

export const FINISH_SETUP = 'FINISH_SETUP'

export const SESSION_TIMEOUT = 'SESSION_TIMEOUT'
export const SESSION_TIMEOUT_CLEAR = 'SESSION_TIMEOUT_CLEAR'

export const SHOW_SIGNUP = 'SHOW_SIGNUP'
export const SHOW_SIGNIN = 'SHOW_SIGNIN'
export const SHOW_USERNAME = 'SHOW_USERNAME'
export const SHOW_GENDER = 'SHOW_GENDER'

export const VERIFY_EMAIL = 'VERIFY_EMAIL'

export const authorize = createAction(AUTH_REQUEST, (login, password, rememberme) => ({ login, password, rememberme }))
export const logout = createAction(LOG_OUT)
export const clearError = createAction(CLEAR_ERROR)
export const showSignin = createAction(SHOW_SIGNIN)
export const showSignup = createAction(SHOW_SIGNUP)
export const showUsername = createAction(SHOW_USERNAME)
export const showGender = createAction(SHOW_GENDER)
export const finishSetup = createAction(FINISH_SETUP)
export const verifyEmail = createAction(VERIFY_EMAIL)
export const updateProfile = createAction(UPDATE_PROFILE, (photo, note) => ({ photo, note }))
export const getRecommanded = createAction(GET_RECOMMANDED)
export const followUser = createAction(FOLLOW_USER, (userId) => ({ userId}))
export const checkUsername = createAction(CHECK_USERNAME, (username) => ({username}))
export const unFollowUser = createAction(UNFOLLOW_USER, (userId) => ({ userId}))
export const fbRegister = createAction(FB_REGISTER, (token, username) => ({ token, username }))
export const register = createAction(
  REGISTER_REQUEST, (
    username,
    fullname,
    email,
    pwRegister,
    gender,
    birthdate
  ) => ({ 
    username,
    fullname,
    email,
    pwRegister,
    gender,
    birthdate
  })
)

export const setGenderBithdate = createAction(
  REGISTER_REQUEST, (
    gender,
    birthdate
  ) => ({ 
    gender,
    birthdate
  })
)

const initialState = {
  token: '',
  error: null,
  userInfo: null,
  hasAccount: false,
  currentStep: 0,
  recommandUsers: [],
  followedUsers: [],
  usernameAvailable: false,
}

export default handleActions({
  FINISH_SETUP: state => ({
    ...state,
    hasAccount: true
  }),

  CLEAR_ERROR: state => ({
    ...state,
    error: null
  }),

  AUTH_REQUEST: state => ({
    ...state,
    error: null
  }),

  AUTH_SUCCESS: (state, { payload: { key, user } } ) => ({
    ...state,
    userInfo: user,
    token: key,
    hasAccount: false
  }),

  FB_REGISTER_SUCCESS: (state, { payload: { key, user } } ) => ({
    ...state,
    userInfo: user,
    token: key,
    hasAccount: false
  }),

  FB_REGISTER_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  CHECK_USERNAME_SUCCESS: (state, { payload: { username } } ) => ({
    ...state,
    usernameAvailable: true
  }),

  CHECK_USERNAME_FAILURE: (state, { payload: error }) => ({
    ...state,
    error: error,
    usernameAvailable: false
  }),

  GET_RECOMMANDED_SUCCESS: (state, { payload: { results }}) => ({
    ...state,
    recommandUsers: results,
  }),

  FOLLOW_USER_SUCCESS: (state, { payload: { userId }}) => {
    return {
      ...state,
      followedUsers: state.followedUsers.concat([userId]),
    }
  },

  UNFOLLOW_USER_SUCCESS: (state, { payload: { userId }}) => {
    return {
      ...state,
      followedUsers: state.followedUsers.filter(item => item !== userId)
    }
  },

  AUTH_FAILURE: (state, { payload: error }) => ({
    ...state,
    error
  }),

  SHOW_SIGNIN: state => ({
    ...state,
    currentStep: 0,
  }),

  SHOW_SIGNUP: state => ({
    ...state,
    currentStep: 1,
  }),

  SHOW_USERNAME: state => ({
    ...state,
    currentStep: 3,
  }),

  SHOW_GENDER: state => ({
    ...state,
    currentStep: 2,
  }),

  REGISTER_REQUEST_FAILURE: (state, { payload: error }) => ({
    ...state,
    error,
    currentStep: 1,
  }),

  REGISTER_REQUEST_SUCCESS: (state, { payload: {key, user} }) => ({
    ...state,
    token: key,
    userInfo: user
  }),

  UPDATE_PROFILE_SUCCESS: state => ({
    ...state,
    error: 2,
  }),

  LOG_OUT: state => {
    window.Intercom('shutdown')
    window.Intercom('boot', {
      app_id: window.INTERCOM_APP_ID
    })

    return {...state, token: null}
  },

  SESSION_TIMEOUT: (state) => ({
    ...state,
    isSessionTimeout: true,
  }),

  SESSION_TIMEOUT_CLEAR: (state) => ({
    ...state,
    isSessionTimeout: false,
  })
}, initialState)

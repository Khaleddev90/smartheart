import { call, put, select, all } from 'redux-saga/effects'

import { 
  doAuth,
  doRegister,
  doVerify,
  doUpdateProfile,
  doGetRecommanded,
  doFollowUser,
  doUnFollowUser,
  doCheckUsername,
  doAuthFacebook,
} from 'utils/api'

import { push } from 'react-router-redux'

import { 
  AUTH_SUCCESS,
  AUTH_FAILURE,
  FB_REGISTER_SUCCESS,
  FB_REGISTER_FAILURE,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_RECOMMANDED_SUCCESS,
  GET_RECOMMANDED_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAILURE,
  BIRTHDATE_REQUEST
} from 'reducers/auth'
import { TOGGLE_POPUP } from 'reducers/UI'

const userIdSelector = state => state.auth.userInfo.id;

export function* authorize({ payload: { login, password, rememberme } }) {
  try {
    const { data: { key, user }} = yield call(doAuth, login, password)
    localStorage.setItem('token', key)
    localStorage.setItem('username', user.username)
    localStorage.setItem('user_email', user.email)
    if (rememberme) {
      localStorage.setItem('login', login)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('login')
      localStorage.removeItem('password')
    }
    
    window.Intercom('boot', {
      app_id: window.INTERCOM_APP_ID,
      name: user.username,
      email: user.email,
    })

    // if (user.email_verified) {
      yield all ([
        yield put({ type: AUTH_SUCCESS, payload: { user, key }}),
        yield put(push('/dashboard')),
        yield put({ type: TOGGLE_POPUP, payload: { type: 'login', isToggled: false }})
      ])
    // } else {
    //   yield all ([
    //     yield put({ type: AUTH_SUCCESS, payload: { user, key }}),
    //     yield put(push('/verify')),
    //     yield put({ type: TOGGLE_POPUP, payload: { type: 'login', isToggled: false }})
    //   ])
    // }
    
  } catch (error) {

    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = 'Login or password not valid'
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: AUTH_FAILURE, payload: message })
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_email')
  }
}

export function* fbRegister({ payload: { token, username } }) {
  try {
    const { data: { key, user }} = yield call(doAuthFacebook, token, username)
    
    localStorage.setItem('token', key)
    localStorage.setItem('username', user.username)
    localStorage.setItem('user_email', user.email)
    
    window.Intercom('boot', {
      app_id: window.INTERCOM_APP_ID,
      name: user.username,
      email: user.email,
    })

    
    yield all ([
      yield put({ type: FB_REGISTER_SUCCESS, payload: { user, key }}),
      yield put(push('/dashboard')),
      yield put({ type: TOGGLE_POPUP, payload: { type: 'login', isToggled: false }})
    ])
  } catch (error) {

    let message = 'Something went wrong'
    yield put({ type: FB_REGISTER_FAILURE, payload: message })
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_email')
  }
}

export function* verifyEmail() {
  try {
      yield call( doVerify, localStorage.getItem('token'))
  } catch (error) {
  }
}

export function* register({ payload: 
  { 
    username,
    fullname,
    email,
    pwRegister,
    gender,
    birthdate 
  } }) {
  try {
    const { data: { key, user }} = yield call(
      doRegister, 
      username,
      fullname,
      email,
      pwRegister,
      gender,
      birthdate 
    )
    localStorage.setItem('token', key)
    localStorage.setItem('username', user.username)
    localStorage.setItem('user_email', user.email)
    yield all ([
      yield put({ type: REGISTER_REQUEST_SUCCESS, payload: {key: key, user: user}}),
      yield put({ type: BIRTHDATE_REQUEST, payload: { gender: gender, birthdate: birthdate}}),
      yield call( doVerify, key),
      
    ])
  } catch (error) {
    
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: 
        message = ''
        if (error.response.data.password1)
          message += error.response.data.password1
          message += "\n"
        
        if (error.response.data.username)
          message += error.response.data.username
          message += "\n"

        if (error.response.data.email)
          message += error.response.data.email
          message += "\n"
          
        break;
      default: message = ''
    }
    yield put({ type: REGISTER_REQUEST_FAILURE, payload: message })
  }
}

export function* setGenderBithdate ({ payload:
  {
    gender,
    birthdate,
  } }) {
  try {
    yield all ([
      yield put(push('/verify')),
      yield put({ type: TOGGLE_POPUP, payload: { type: 'login', isToggled: false }})
    ])
  } catch (error) {
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = error.response.message
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: REGISTER_REQUEST_FAILURE, payload: message })
  }
}

export function* updateProfile ({ payload:
  {
    photo,
    note,
  } }) {
  try {
    const userId = yield select(userIdSelector)
    yield all ([
      yield call( doUpdateProfile, userId, photo, note),
      yield put({ type: UPDATE_PROFILE_SUCCESS, payload: { }}),
      yield put(push('/follow')),
    ])
  } catch (error) {
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = error.response.message
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: UPDATE_PROFILE_FAILURE, payload: message })
  }
}
  
export function* getRecommandedUsers() {
  try {
    let {data: {results}} = yield call(doGetRecommanded)
    yield all ([
      yield put({ type: GET_RECOMMANDED_SUCCESS, payload: { results }}),
    ])
  } catch (error) {
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = error.response.message
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: GET_RECOMMANDED_FAILURE, payload: message })
    yield put(push('/'))
  }
}

export function* followUser ({ payload:
  {
    userId,
  } }) {
  try {
    yield call( doFollowUser, userId)
    yield all ([
      yield put({ type: FOLLOW_USER_SUCCESS, payload: { userId }}),
    ])
  } catch (error) {
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = error.response.message
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: FOLLOW_USER_FAILURE, payload: {message} })
    yield put(push('/'))
  }
}

export function* checkUsername ({ payload:
  {
    username,
  } }) {
      try {
        let message = 'Same username is already exist.'
        yield call( doCheckUsername, username)
        yield all ([
          yield put({ type: CHECK_USERNAME_FAILURE, payload: {message} })
        ])
      } catch (error) {
        switch(error.response.status){
          case 404:
            if(username === ""){
                let message = 'Not available'
                yield put({ type: CHECK_USERNAME_FAILURE, payload: {message} })
            } else {
                yield put({ type: CHECK_USERNAME_SUCCESS, payload: { username }})
            }
            break
          default:
            let message = 'Not available'
            yield put({ type: CHECK_USERNAME_FAILURE, payload: {message} })
            break
        }
      }
}

export function* unFollowUser ({ payload:
  {
    userId,
  } }) {
  try {
    yield call( doUnFollowUser, userId)
    yield all ([
      yield put({ type: UNFOLLOW_USER_SUCCESS, payload: { userId }}),
    ])
  } catch (error) {
    let message
    switch (error.response.status) {
      case 500: message = 'Internal Server Error'
        break;
      case 400: message = error.response.message
        break;
      default: message = 'Something went wrong'
    }
    yield put({ type: UNFOLLOW_USER_FAILURE, payload: message })
  }
}
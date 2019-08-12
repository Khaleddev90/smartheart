import { takeEvery, all } from 'redux-saga/effects'

import { UPLOAD_FILE_REQUEST, DELETE_VIDEO_REQUEST } from 'reducers/uploadFile'
import { uploadFile, deleteVideo } from './uploadFileSaga'

import { PUBLISH_PRODUCT_REQUEST, SET_PRODUCT_REQUEST, MISSING_PRODUCT_REQUEST } from 'reducers/publishProduct'
import { publishProduct, setProductTag, missingProductTag } from  './publishProductSaga'

import { PRODUCTS_SEARCH_REQUEST } from 'reducers/searchProducts'
import { searchProducts } from  './searchProductsSaga'

import { AUTH_REQUEST, REGISTER_REQUEST, BIRTHDATE_REQUEST, VERIFY_EMAIL, UPDATE_PROFILE, GET_RECOMMANDED, FOLLOW_USER, UNFOLLOW_USER, CHECK_USERNAME, FB_REGISTER } from 'reducers/auth'
import { authorize, register, setGenderBithdate, verifyEmail, updateProfile, getRecommandedUsers, followUser, unFollowUser, checkUsername, fbRegister } from './authSaga'

import { FETCH_VIDEOS, CHANGE_VIDEO_TITLE_REQUEST, FETCH_FOLLOWERS, FETCH_FOLLOWINGS } from 'reducers/dashboard'
import { fetchVideosSaga, changeVideoTitle, fetchFollowers, fetchFollowings } from './dashboardSaga'

import { API_ERROR } from 'utils/api'
import { errorSaga } from './errorSaga'

function* rootSaga() {
  yield all([
    // Upload file
    takeEvery(UPLOAD_FILE_REQUEST, uploadFile),

    // Publish Product
    takeEvery(PUBLISH_PRODUCT_REQUEST, publishProduct),

    // Search Products
    takeEvery(PRODUCTS_SEARCH_REQUEST, searchProducts),

    // Set Product
    takeEvery(SET_PRODUCT_REQUEST, setProductTag),

    // Missing Product
    takeEvery(MISSING_PRODUCT_REQUEST, missingProductTag),

    // Auth
    takeEvery(AUTH_REQUEST, authorize),

    // Dashboard
    takeEvery(FETCH_VIDEOS, fetchVideosSaga),

    // Delete Video
    takeEvery(DELETE_VIDEO_REQUEST, deleteVideo),

    // Change Video
    takeEvery(CHANGE_VIDEO_TITLE_REQUEST, changeVideoTitle),

    // Handler for api error
    takeEvery(API_ERROR, errorSaga),

    // Register
    takeEvery(REGISTER_REQUEST, register),

    // Register
    takeEvery(BIRTHDATE_REQUEST, setGenderBithdate),    
    
    // Verify Email
    takeEvery(VERIFY_EMAIL, verifyEmail),

    takeEvery(UPDATE_PROFILE, updateProfile),

    // Get Recommanded User List
    takeEvery(GET_RECOMMANDED, getRecommandedUsers),

    // Follow User
    takeEvery(FOLLOW_USER, followUser),

    // UnFollow User
    takeEvery(UNFOLLOW_USER, unFollowUser),

    // fetch followers
    takeEvery(FETCH_FOLLOWERS, fetchFollowers),

    // fetch followings
    takeEvery(FETCH_FOLLOWINGS, fetchFollowings),

    // Search Username
    takeEvery(CHECK_USERNAME, checkUsername),

    // facebook register
    takeEvery(FB_REGISTER, fbRegister)
    
  ])
}

export default rootSaga

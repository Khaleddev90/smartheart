import axios, { CancelToken } from 'axios'
import { CANCEL } from 'redux-saga'
import { store } from './store'

// TODO: make this configurable based on NODE_ENV or something...
const address = process.env.REACT_APP_API_HOST;

// Upload File

export const doUploadFile = (file, onUploadProgress) => {
  if (file && file[0]) {
    const source = CancelToken.source()
    let formPayload = new FormData()
    formPayload.append('file', file[0])

    const reqOptions = {
      method: 'POST',
      url: `${address}/upload/`,
      headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      data: formPayload,
      cancelToken: source.token,
      onUploadProgress
    }

    const request = axios(reqOptions)
    request[CANCEL] = () => source.cancel()
    return request
  }
}
// Set title

export const doPublishProduct = (id, title, description) => {
  return axios({
    method: 'PATCH',
    url: `${address}/api/v1/videos/${id}/`,
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    data: { title, description, publish: true }
  })
}

// Set Product

export const doSetProduct = (videoId, productId) => {
  const reqOptions = {
    method: 'POST',
    url: `${address}/api/v1/videos/${videoId}/products/`,
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    data: { id: productId },
  };
  return axios(reqOptions);
};

// Missing Product

export const doMissingProduct = (videoId, name, color, style_code, notes, photos) => {

  let formPayload = new FormData()

  if (photos.length > 0) {
    formPayload.append('photo', photos[0])
  }
  formPayload.append('video.id', videoId)
  formPayload.append('name', name)
  formPayload.append('color', color)
  formPayload.append('style_code', style_code)
  formPayload.append('notes', notes)


  const reqOptions = {
    method: 'post',
    url: `${address}/api/v1/missing-products/`,

    data: formPayload,

  };
  console.log(JSON.stringify(reqOptions))
  const url = `${address}/api/v1/missing-products/`
  const config = { headers: {
    Authorization: 'Token ' + localStorage.getItem('token')
  }
  }
  return axios.post(url, formPayload, config);
};


// Search products

export const doSearchProducts = (query, next) => {
  const reqOptions = {
    method: 'GET',
    url: !!(next) ? next : `${address}/api/v1/search/?topic=products&limit=20&q=${query}`,
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
  };
  return axios(reqOptions)
};

export const doCheckUsername = (username) => {
  const reqOptions = {
    method: 'GET',
    url: `${address}/api/v1/users/usernames/${username}`
  };
  return axios(reqOptions)
}
export const deleteProductUrl = (url, id) => {
  const reqOptions = {
    method: 'DELETE',
    url: `${address}/api/v1/videos/${id}/products/`,
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    data: { url: url },
  };

  return axios(reqOptions)
}

// Auth

export const doAuth = (login, password) => {
  return axios({
    url: `${address}/rest-auth/login/`,
    method: 'POST',
    data: {
      username: login,
      password
    }
  })
}

export const doAuthFacebook = (token, username) => {
  return axios({
    url: `${address}/rest-auth/facebook/`,
    method: 'POST',
    data: {
      access_token: token,
      username: username
    }
  })
}

export const doRegister = (
    username,
    fullname,
    email,
    pwRegister,
    gender,
    birthdate 
  ) => {
  return axios({
    url: `${address}/rest-auth/registration/`,
    method: 'POST',
    data: {
      email: email,
      username: username,
      full_name: fullname,
      password1: pwRegister,
      password2: pwRegister,
      gender: gender,
      birthdate: birthdate, 
    }
  })
}

export const doVerify = (key) => {
  return axios({
    url: `${address}/rest-auth/registration/verify-email/`,
    method: 'POST',
    data: { key: key }
  })
}

export const doGetRecommanded = () => {
  const reqOptions = {
    method: 'GET',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    url: `${address}/api/v1/recommended/follows/`,
  }
  return axios(reqOptions)
}
export const doUpdateProfile = (id, photo, note) => {

  let formPayload = new FormData()

  formPayload.append('photo', photo)
  formPayload.append('description', note)

  const url = `${address}/api/v1/users/${id}/`
  const config = { 
    headers: {
      Authorization: 'Token ' + localStorage.getItem('token')
    }
  }
  return axios.patch(url, formPayload, config);
}

export const doFollowUser = (userId) => {

  const reqOptions = {
    method: 'POST',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    url: `${address}/api/v1/users/${userId}/followers/`,
  }
  return axios(reqOptions)
}

export const doUnFollowUser = (userId) => {
  const reqOptions = {
    method: 'DELETE',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    url: `${address}/api/v1/users/${userId}/followers/`,
  }
  return axios(reqOptions)
}

export const doFetchFollowers = (userId) => {
  const reqOptions = {
    method: 'GET',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    url: `${address}/api/v1/users/${userId}/followers/`,
  }
  return axios(reqOptions)
}

export const doFetchFollowings = (userId) => {
  const reqOptions = {
    method: 'GET',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    url: `${address}/api/v1/users/${userId}/following/`,
  }
  return axios(reqOptions)
}

export const fetchVideos = (id) => {

  const reqOptions = {
   method: 'GET',
   headers: { Authorization: 'Token ' + localStorage.getItem('token') },
  url: `${address}/api/v1/users/${id}/videos/`,
  }
  return axios(reqOptions)
}

// Delete video

export const doDeleteVideo = (id) =>
  axios({
    url: `${address}/api/v1/videos/${id}/`,
    method: 'DELETE',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') }
  })

// Get pending Video

export const dopendingVideos = () => {
  const reqOptions = {
    method: 'GET',
    url: `${address}/api/v1/videos/pending/`,
    headers: { Authorization: 'Token ' + localStorage.getItem('token') }
  };
  return axios(reqOptions)
};

// Get Comments

export const doGetComments = (id) => {
  axios({
    url: `${address}/api/v1/videos/${id}/comments/`,
    method: 'GET',
    headers: { Authorization: 'Token ' + localStorage.getItem('token') }
  })
}

/**
 * get list of trending videos and list of featured channels for Home page
 */
export const doGetHomePageContent = () => {
  return axios({
    url: `${address}/api/v1/homepagecontent`,
    method: 'GET',
  })
};

export const API_ERROR = 'API_ERROR'
/**
 * interceptor for request error
 */
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const { response } = error;
  if (response && !(response.status >= 200 && response.status <= 300)) {
    store.dispatch({
      type: API_ERROR,
      payload: error,
    })
  }
  return Promise.reject(error);
});

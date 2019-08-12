import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadFile, uploadFileProgressUpdate } from 'reducers/uploadFile'
import { fetchVideos, clearDashboard, changeVideoTitle, fetchFollowings, fetchFollowers } from 'reducers/dashboard'

import Dashboard from './Dashboard'

const mapDispatchToProps = dispatch => bindActionCreators({
  uploadFile,
  uploadFileProgressUpdate,
  fetchVideos,
  fetchFollowers,
  fetchFollowings,
  clearDashboard,
  changeVideoTitle
}, dispatch)

const mapStateToProps = state => ({
  isFileUploaded: state.uploadFile.isFileUploaded,
  token: state.auth.token,
  videos: state.dashboard.videos,
  isFetchVideos: state.dashboard.isFetchVideos,
  pendingVideos: state.dashboard.pendingVideos,
  error: state.dashboard.error,
  followers: state.dashboard.followers,
  followings: state.dashboard.followings,
  currentPage: state.dashboard.currentPage,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

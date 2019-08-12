import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchVideos, clearDashboard } from 'reducers/dashboard'

import Uploads from './Uploads'

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchVideos,
  clearDashboard,
}, dispatch)

const mapStateToProps = state => ({
  videos: state.dashboard.videos,
  isFetchVideos: state.dashboard.isFetchVideos,
  pendingVideos: state.dashboard.pendingVideos,
  error: state.dashboard.error,
  currentPage: state.dashboard.currentPage,
})

export default connect(mapStateToProps, mapDispatchToProps)(Uploads)

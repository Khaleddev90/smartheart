import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeAll as removeAllNotifications } from 'react-notification-system-redux'

import { togglePopup } from 'reducers/UI'
import { logout } from 'reducers/auth'
import { selectPage } from 'reducers/dashboard'

import DashboardLayout from './DashboardLayout'

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePopup,
  logout,
  removeAllNotifications,
  selectPage,
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  userInfo: state.auth.userInfo,
  notifications: state.notifications,
  videos: state.dashboard.videos,
  followings: state.dashboard.followings,
  followers: state.dashboard.followers,
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)

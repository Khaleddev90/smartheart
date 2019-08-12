import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeAll as removeAllNotifications } from 'react-notification-system-redux'

import { togglePopup } from 'reducers/UI'
import { logout } from 'reducers/auth'

import Layout from './Layout'

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePopup,
  logout,
  removeAllNotifications,
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  userInfo: state.auth.userInfo,
  notifications: state.notifications,
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

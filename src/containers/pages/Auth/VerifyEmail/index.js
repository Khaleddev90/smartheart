import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VerifyEmail from './VerifyEmail'
import { authorize, verifyEmail } from 'reducers/auth'

const mapDispatchToProps = dispatch => bindActionCreators({
  authorize,
  verifyEmail,
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  token: state.auth.token,
  error: state.auth.error,
  userInfo: state.auth.userInfo,
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)

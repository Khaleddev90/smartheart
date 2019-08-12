import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FinishSignup from './FinishSignup'
import { updateProfile } from 'reducers/auth'
const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile,
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  token: state.auth.token,
  error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(FinishSignup)

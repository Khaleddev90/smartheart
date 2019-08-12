import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Main from './Main'
import { togglePopup } from 'reducers/UI'
import { authorize, clearError, register, showSignin, showSignup, showUsername, showGender, checkUsername, fbRegister } from 'reducers/auth'

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePopup,
  authorize,
  register,
  showSignin,
  showSignup, 
  showUsername,
  showGender,
  checkUsername,
  fbRegister,
  clearError
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  token: state.auth.token,
  error: state.auth.error,
  usernameAvailable: state.auth.usernameAvailable,
  currentStep: state.auth.currentStep,
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

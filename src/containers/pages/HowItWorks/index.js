import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import HowItWorks from './HowItWorks'
import { togglePopup } from 'reducers/UI'
import { authorize, clearError } from 'reducers/auth'

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePopup,
  authorize,
  clearError
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  token: state.auth.token,
  error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks)

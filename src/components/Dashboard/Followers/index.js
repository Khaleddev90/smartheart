import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Followers from './Followers'

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

const mapStateToProps = state => ({
  followers: state.dashboard.followers,
  error: state.dashboard.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Followers)

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { } from 'reducers/dashboard'

import Followings from './Followings'

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

const mapStateToProps = state => ({
  
	followings: state.dashboard.followings,
  error: state.dashboard.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(Followings)

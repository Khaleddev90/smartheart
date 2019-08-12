import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Follow from './Follow'
import { getRecommanded, followUser, unFollowUser } from 'reducers/auth'
const mapDispatchToProps = dispatch => bindActionCreators({
  getRecommanded,
  followUser,
  unFollowUser,
}, dispatch)

const mapStateToProps = state => ({
  popup: state.UI.popup,
  token: state.auth.token,
  recommandUsers: state.auth.recommandUsers,
  followedUsers: state.auth.followedUsers,
  error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Follow)

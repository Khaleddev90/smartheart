import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Transactions from './Transactions'

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

const mapStateToProps = state => ({
  hasAccount: state.auth.hasAccount
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

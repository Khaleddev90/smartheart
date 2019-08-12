import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { finishSetup } from 'reducers/auth'

import BankSettings from './BankSettings'

const mapDispatchToProps = dispatch => bindActionCreators({
  finishSetup
}, dispatch)

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BankSettings)

import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router'
import { spring, AnimatedSwitch } from 'react-router-transition'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import Main from 'containers/pages/Main/index'
import Dashboard from 'containers/pages/Dashboard/index'
import Transactions from 'containers/pages/Transactions/index'
import Success from 'containers/pages/Success/Success'
import BankSettings from 'containers/pages/BankSettings/index'

import TermsOfUse from 'containers/pages/Legal/TermsOfUse'
import PrivacyPolicy from 'containers/pages/Legal/PrivacyPolicy'
import CookiePolicy from 'containers/pages/Legal/CookiePolicy'
import Jobs from 'containers/pages/Jobs/Jobs'
import HowItWorks from 'containers/pages/HowItWorks'
import Android from 'containers/pages/Android'
import VerifyEmail from 'containers/pages/Auth/VerifyEmail'
import FinishSignup from 'containers/pages/Auth/FinishSignup'
import Follow from 'containers/pages/Auth/Follow'

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    height: '100%'
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.3,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};


class Routes extends Component {

  render () {

    const {
      token,
    } = this.props

      return (
        <div className="App">
          <Helmet
            titleTemplate="%s | Heartface"
            defaultTitle="Heartface | Watch and cop fire kicks"
          >
            <meta name="description" content="Heartface | Watch and cop fire kicks" />
          </Helmet>
          <Switch>
            <Route
              path="/privacy-policy"
              exact
              component={PrivacyPolicy}
            />
            <Route
              path="/terms-of-use"
              exact
              component={TermsOfUse}
            />
            <Route
              path="/cookie-policy"
              exact
              component={CookiePolicy}
            />
            <Route
              path="/jobs"
              exact
              component={Jobs}
            />
            <Route
              path="/how-it-works"
              exact
              component={HowItWorks}
            />
            <Route
              path="/android"
              exact
              component={Android}
            />
            <Route
              path="/verify"
              exact
              component={VerifyEmail}
            />
            <Route
              path="/finishsignup"
              exact
              component={FinishSignup}
            />
            <Route
              path="/follow"
              exact
              component={Follow}
            />
          
            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="route-wrapper">

              <Route
                path="/account_settings"
                exact
                component={BankSettings}
              />
              <Route
                path="/"
                exact
                component={Main}
              />
              { !token && <Redirect to='/'/> }
                <Route
                  path='/dashboard'
                  component={Dashboard}
                    />
            
                <Route
                  path='/success'
                  component={Success}
                    />
                <Route
                  path="/transactions"
                  exact
                  component={Transactions}
                />
              
            </AnimatedSwitch>
          </Switch>
        </div>
      )
    }
  }

  const mapStateToProps = state => ({token: state.auth.token})

export default withRouter(connect(mapStateToProps)(Routes))

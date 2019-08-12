import React, { Component } from 'react'
import styled from 'styled-components'
import keydown from 'react-keydown'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Notifications from 'react-notification-system-redux'

import DashboardHeader from 'components/UI/DashboardHeader'

import withLoginPopup from 'components/hoc/withLoginPopup'

const notificationStyle = {
  Containers: {
    tr: {
      top: '60px',
    }
  }
};

class Layout extends Component {

  componentDidMount = () => {
    this.props.removeAllNotifications()
  };

  @keydown( 'esc' )
  submit( event ) {
    const { togglePopup, popup: { type, isToggled } } = this.props
    if (type && isToggled) {
      togglePopup({ type, isToggled: false })
    } else return null
  }

  toggleAccountModalHandler = () => {
    const {
      togglePopup,
      popup: { type, isToggled }
    } = this.props
     if (isToggled && type === 'account') {
      togglePopup({ type:'account', isToggled: false })
     } else {
      togglePopup({ type:'account', isToggled: true })
     }
  }

  closeAccountModalHandler = () => {
    const {
      togglePopup,
      popup: { type, isToggled }
    } = this.props
     if (isToggled && type === 'account') {
      togglePopup({ type:'account', isToggled: false })
     } else return null
  }

  logoutHandler = () => {
    const { logout } = this.props
    logout()
  }

  selectPageHandler = (pageIndex) => {
    const { selectPage } = this.props
    selectPage(pageIndex)
  }

  render() {

    const {
      children,
      popup,
      userInfo,
      history,
      notifications,
      videos,
      followers,
      followings,
    } = this.props

    return (
      <Content>
        <DashboardHeader
          history={history}
          userInfo={userInfo}
          videos={videos}
          followings={followings}
          followers={followers}
          popup={popup}
          logoutHandler={this.logoutHandler}
          toggleAccountModalHandler={this.toggleAccountModalHandler}
          closeAccountModalHandler={this.closeAccountModalHandler}
          selectPageHandler={this.selectPageHandler}
        />
        <Aux>
          {children}
        </Aux>
        <Notifications
          notifications={notifications}
          style={notificationStyle}
        />
      </Content>
    )
  }

}

export default compose(
  connect(null),
  withLoginPopup,
)(Layout)

const Content = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: #fff;
`
const Aux = styled.div`
  margin: 0 auto;
  width: 80%;
  flex: 1;
  background-color: black;

  @media(max-width: 1010px) {
    width: 95%;
  }
`

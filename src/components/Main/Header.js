import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Popup from 'components/UI/Popup'
import MobileInstall from 'components/UI/MobileInstall'
import detectMobile from 'utils/detectMobile'
import logo from 'assets/heartface-logo-red-3x.png'
import appStore from 'assets/download-apple.png'
export default class Header extends Component {
  state = {
    popupOpen: false,
  };

  handleClick = (e) => {
    const { openPopup, token, history } = this.props;
    if (detectMobile()) {
      this.setState({
        popupOpen: true,
      })
    } else if (!token) {
      openPopup()
    } else {
      history.push('/dashboard')
    }
  };

  handleAppStore = (e) => {
    const url = 'https://itunes.apple.com/gb/app/heartface/id1265136931?mt=8';
    window.open(url, '_blank');
  }

  render() {
    return (
      <React.Fragment>
        <MobileInstall />
        <Content>
          <Link to="/">
            <Logo src={logo} alt="Logo"/>
          </Link>
          <RightBlock>
            <Upload onClick={e => this.handleClick(e)}>upload videos</Upload>
            <AppLinks  onClick={ e => this.handleAppStore(e)}>
             <StoreLink src={appStore}/>
           </AppLinks>
          </RightBlock>
        </Content>
        <Popup
          isPopupOpen={this.state.popupOpen}
          closePopup={() => { this.setState({popupOpen: false}) }}
          title="Mobile version">
          <PopupBody>Go to <a href="https://heartface.tv">Heartface.tv</a> on your computer to upload</PopupBody>
        </Popup>
      </React.Fragment>
    )
  }
}

Header.propTypes = {

}

const Content = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  margin-left: 100px;
  margin-right: 100px;

  @media (max-width: 1300px) {
    margin-left: 50px;
    margin-right: 50px;
  }

  @media (max-width: 767px) {
    margin-top: 10px;
    width: 125px;
    margin: 50px auto;
  }
`;

const Logo = styled.img`
  width: 125px;
  height: 26px;
  @media (max-width: 767px) {
    flex: 0 0 auto;
  }
`;

const RightBlock = styled.div`
  display: flex;
  @media (max-width: 767px) {
    display: none;
  }
`;

const Upload = styled.div`
  color: #000;
  font-size: 18px;;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  margin-right: 50px;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.25px;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const AppLinks = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & > .disabled {
    opacity: 0.4;
  }

  @media (max-width: 950px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 45px;
    flex-direction: column;
    & > * {
      margin-bottom: 10px;
    }
  }
`;

export const StoreLink = styled.img`
  margin: 0 auto;
  width: 112px;
  height: 38px;
`;

const PopupBody = styled.div `
  padding: 15px 20px;
  box-sizing: border-box;
`;
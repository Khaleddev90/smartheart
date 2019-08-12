import React, { Component } from 'react'
import styled from 'styled-components'
import tickerface from 'assets/Tickerface@3x.gif'
import closeIcon from 'assets/mobile-closeinstall.png'

export default class MobileInstall extends Component {
  state = {
    showInstall: true,
  };
  handleClick = () => {
    this.setState({showInstall:false})
  };

  handleAppStore = (e) => {
    const url = 'https://itunes.apple.com/gb/app/heartface/id1265136931?mt=8';
    window.open(url, '_blank');
  }

  render() {
    return (
      <div>
        { this.state.showInstall ?
          <Content>
            <div onClick={this.handleClick}>
              <CloseIcon src={closeIcon}/>
            </div>

            <Tickerface src={tickerface}/>
            <Text>
              <Title>Heartface</Title>
              Watch reviews/unboxings and shop<br />
              dope kicks. Upload your own<br />
              videos to earn 💰
            </Text>
            <InstallButton onClick={ e => this.handleAppStore(e)} >INSTALL</InstallButton>
          </Content>
         : <div></div> }

      </div>
    )
  }

}

const Content = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    width: 100%;
    height: 74px;
    background-color: #f6f6f6;
    display: flex;
  }

`

const CloseIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-top: 19px;
  margin-left: 19px;
  cursor: pointer;
`

const Tickerface = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 11px;
  margin-left: 20px;
  border: 1px solid #a1a1a1;
  border-radius: 8px;
`

const Text = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  width: 120px;
  hight: 51px;
  font-size: 8px;

`

const Title = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
  font-weight: bold;
  margin-top: 4px;
`

const InstallButton = styled.div`
  width: 50px;
  height: 20px;
  background-color: #FD3649;
  cursor: pointer;
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;
  color: white;
  vertical-align: middle;
  line-height: 20px;
`

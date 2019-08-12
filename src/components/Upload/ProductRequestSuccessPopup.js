import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from 'components/UI/Popup'

export default class ProductRequestSuccessPopup extends Component {

  render () {

    const {
        handleContinue,
        isPopupOpen,
      } = this.props

    return (
      <Popup
        isPopupOpen={isPopupOpen}
        title='Your product request was submitted successfully'
        width='600px'
        styles={{
              cross:{display:'none'},
              arrow:{display:'none'},
              header:{backgroundColor:'inherit',
              padding: '30px 0px 0px 30px',
              WebkitJustifyContent: 'inherit',
              justifyContent: 'inherit',
              height: 'auto'},
              title:{color:'black',
              fontSize: '24px'},
             }}
              >
        <Content>
          <Subtitle>Our product data team will look into it ASAP and add it to your database if it doesn't exist already. You may now go ahead and tag more products, or publish your video and leave the rest to us.</Subtitle>
          <Hr />
          <NoButton onClick={() => handleContinue()} >CONTINUE</NoButton>
        </Content>
      </Popup>
    )
  }

}

const Hr = styled.hr`
  background: #d8d8d8;
  height: 1px;
  margin-left: -30px;
  margin-right: -30px;
  border: 0;
`;
const Button = styled.div`
  width: 100%;
  border: 3px solid #000;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 7px;
  text-align: center;
  fontSize: 18px;
  color: #000;
  -webkit-transition: border,color .5s;
  transition: border,color .5s;
  -webkit-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
  border: none;
`

const NoButton = styled(Button)`
  width: 130px;
  float: right;
  font-weight: bold;
  font-size: 24px;
  color: #fd3649;
`

const Subtitle = styled.h5`
  color:#a2a2a2;
  font-size:16px;
  font-weight: normal;

`

const Content = styled.div `
  padding: 0px 30px;
  box-sizing: border-box;
`

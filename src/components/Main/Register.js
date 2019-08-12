  
import React, { Component } from 'react'
import * as EmailValidator from 'email-validator'
import arrowImg from 'assets/rightarrow@2x.png'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
  Subtitle,
  PasswordItem,
  PassShow1,
  FacebookButton,
  Column,
  Row,
  NextButton,
  ArrowImg,
  TermsLink,
  TermsDiv,
  HrOr,
  Errordiv,
  CheckItem,
  CheckMark
} from './StyledElements'

export default class Register extends Component {
  state = {
    isPasswordType: true
  }

  showPassword = () => {
    const { isPasswordType } = this.state

    if (isPasswordType) {
      this.setState({
        isPasswordType: false
      });
    } else {
      this.setState({
        isPasswordType: true
      });
    }
  }
  
  responseFacebook = (response) => {
    if (response.accessToken && response.accessToken !== '') {
      this.props.facebookRegisterHandler(response)
    }
  }

  render () {
    const {
      setRegisterHandler,
      fullnameHandler,
      usernameHandler,
      pwRegisterHandler,
      emailHandler,
      fullname,
      username,
      pwRegister,
      email,
      isError
    } = this.props

    const { isPasswordType } = this.state
    let disabled = (fullname === '' || username === '' || pwRegister === '' || !EmailValidator.validate(email) ) ? true : false
    return (
      <div>
        <Subtitle>Register</Subtitle>
        <Row>
          <Column>
            <CheckItem
              placeholder='Full Name'
              value={fullname}
              onChange={(e) => fullnameHandler(e)} />
            <CheckMark visible={false}>✓</CheckMark>
          </Column>
          <Column>
            <CheckItem
              placeholder='Username'
              value={username}
              onChange={(e) => usernameHandler(e)} />
            <CheckMark visible={false}>✓</CheckMark>  
          </Column>
        </Row>
        <Row>
          <Column>
            <PasswordItem>
              <CheckItem
                onChange={(e) => pwRegisterHandler(e)}
                type={isPasswordType ? 'password' : 'text'}
                placeholder='Password'
                value={pwRegister}
              />
              <PassShow1 onClick={() => this.showPassword()}>show</PassShow1>
            </PasswordItem>
          </Column>
          <Column>
            <CheckItem
              placeholder='Email'
              value={email}
              onChange={(e) => emailHandler(e)} /> 
            <CheckMark visible={false}>✓</CheckMark> 
          </Column>
        </Row>
        <Row>
          <TermsDiv>By continuing you agree to our <TermsLink to='/terms-of-use'>Terms of Use</TermsLink> and <TermsLink to='/privacy-policy'>Privacy Policy</TermsLink></TermsDiv>
        </Row>
        <Row>
          <Errordiv>{isError}</Errordiv>
        </Row>
        <Row>
          <NextButton
            isLogin
            disabled={disabled}
            onClick={() => setRegisterHandler()}
          >
            <ArrowImg src={arrowImg}/>
          </NextButton>
        </Row>
        
        <HrOr data-content="or" />
        
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APPID}
          autoLoad
          fields="name,email,picture,gender,birthday"
          scope="public_profile,user_friends,user_birthday,user_gender"
          callback={(e) => this.responseFacebook(e)}
          render={renderProps => (
            <FacebookButton onClick={renderProps.onClick}>Continue with Facebook</FacebookButton>
          )}
        />
        
      </div>
    )
    
  }
}


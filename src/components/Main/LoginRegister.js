import React, { Component } from 'react'
import Popup from 'components/UI/Popup'
import Login from './Login'
import Register from './Register'
import UserName from './UserName'
import GenderBirthdate from './GenderBirthdate'
import * as EmailValidator from 'email-validator'

import {
  Content,
  SubContent,
  NoneAcc,
  SignButton,
  
} from './StyledElements'

export default class LoginRegister extends Component {

  state = {
    currentStep: 0,
  }

  handleKeyPress = (e) => {
    const { setLoginHandler, closePopup } = this.props
    if (e.key === 'Enter') {
      setLoginHandler()
    }
    if (e.key === 'Escape') {
      closePopup()
    }
  }

  setRegisterHandler = (e) => {
    const {
      fullname,
      username,
      pwRegister,
      email,
    } = this.props
    let disabled = (fullname === '' || username === '' || pwRegister === '' || !EmailValidator.validate(email) ) ? true : false
    if (disabled)
      return
    
    this.props.setRegisterHandler()
  }

  render () {
    const {
      closePopup,
      setLoginHandler,
      isPopupOpen,
      loginHandler,
      passwordHandler,
      isCredentialsSet,
      isError,
      message,
      fullnameHandler,
      usernameHandler,
      pwRegisterHandler,
      emailHandler,
      rememberHandler,
      genderHandler,
      birthdate,
      birthdateHandler,
      setGenderBithdateHandler,
      facebookRegisterHandler,
      facebookLoginHandler,
      rememberme,
      login,
      password,
      email,
      gender,
      pwRegister,
      username,
      fullname,
      currentStep,
      showSignin,
      showSignup,
      fbusername,
      fbusernameHandler,
      setFbUsernameHandler,
      usernameavailable,
    } = this.props
    
    let signButtonLabel = ''
    let bottomDescLabel = ''
    let subContent = <div></div>
    let bottomContent = ''

    switch (currentStep) {
      case 0:
        signButtonLabel = 'Sign up'
        bottomDescLabel = 'Don\'t have an account?'
        subContent = <Login login={login} password={password} rememberme={rememberme} rememberHandler={rememberHandler} setLoginHandler={setLoginHandler} loginHandler={loginHandler} isCredentialsSet={isCredentialsSet} passwordHandler={passwordHandler} facebookLoginHandler={facebookLoginHandler}/>
        bottomContent = <NoneAcc> {bottomDescLabel} <SignButton onClick={showSignup}> {signButtonLabel} </SignButton> </NoneAcc>
        break
      case 1:
        signButtonLabel = 'Log in'
        bottomDescLabel = 'Already have an account?'
        subContent = <Register isError={isError} email={email} fullname={fullname} username={username} pwRegister={pwRegister} facebookRegisterHandler={facebookRegisterHandler} setRegisterHandler={this.setRegisterHandler} fullnameHandler={fullnameHandler} usernameHandler={usernameHandler} pwRegisterHandler={pwRegisterHandler} emailHandler={emailHandler}/>
        bottomContent = <NoneAcc> {bottomDescLabel} <SignButton onClick={showSignin}> {signButtonLabel} </SignButton> </NoneAcc>
        break
      case 2:
        subContent = <GenderBirthdate gender={gender} setGenderBithdateHandler={setGenderBithdateHandler} genderHandler={genderHandler} birthdate={birthdate} birthdateHandler={birthdateHandler} />
        break
      case 3:
        subContent = <UserName usernameavailable={usernameavailable} fbusername={fbusername} fbusernameHandler={fbusernameHandler} setFbUsernameHandler={setFbUsernameHandler} />
        break
        default:
      signButtonLabel = ''
    }

    return (
      <Popup
        isError={isError}
        isPopupOpen={isPopupOpen}
        closePopup={closePopup}
        title=' '
        width='784px'
        styles={{
          cross:{display:'none'},
          arrow:{display:'none'},
          header:{display:'none'},
          title:{color:'black',
          fontSize: '24px'},
        }}
      >
        <Content
          onKeyDown={this.handleKeyPress}>
          <SubContent>
          { message && <h5>Session timeout. Please try again.</h5>}
            {subContent}
          </SubContent>
          {bottomContent}
        </Content>
      </Popup>
    )
  }

}

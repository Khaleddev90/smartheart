
import React, { Component } from 'react'
import Button from 'components/UI/Button'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
  Subtitle,
  Item,
  PasswordItem,
  PassShow,
  RememberDiv,
  RememberCheck,
  ForgotPassword,
  FacebookButton,
  Label,
} from './StyledElements'

export default class Login extends Component {
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
      this.props.facebookLoginHandler(response)
    }
    
  }
  
  render () {
    const {
      setLoginHandler,
      loginHandler,
      passwordHandler,
      rememberHandler,
      isCredentialsSet,
      login,
      password,
      isError,
      rememberme,
    } = this.props

    const { isPasswordType } = this.state

    return (
      <div>
        <Subtitle>Log in</Subtitle>
        <Item
          style={{ marginBottom: '20px', marginTop: '10px' }}
          placeholder='Username or Email'
          value={login}
          onChange={(e) => loginHandler(e)} />
          <PasswordItem>
          <Item
            onChange={(e) => passwordHandler(e)}
            type={isPasswordType ? 'password' : 'text'}
            style={{ marginBottom: '20px', marginTop: '10px' }}
            placeholder='Password'
            value={password}
          />
          <PassShow onClick={() => this.showPassword()}>show</PassShow>
        </PasswordItem>
        <Button
          isActive={isError}
          isLogin
          isCredentialsSet={isCredentialsSet}
          text="Log in"
          onClick={() => setLoginHandler()}
          styles={{ margin: '15px auto 15px', width: '130px', backgroundColor: '#fd3649', color: '#fff', border: 'none', fontSize: '18px', fontWeight: 'bold'}} />
        <RememberDiv>
          <RememberCheck
            onChange={(e) => rememberHandler(e)}
            type='checkbox'
            id="remember" 
            name="remember"
            value={rememberme}
          />
          <Label htmlFor="remember">Remember me</Label>
          <ForgotPassword onClick={() => this.showPassword()}>Forgot Password</ForgotPassword>
        </RememberDiv>  
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APPID}
          autoLoad
          callback={(e) => this.responseFacebook(e)}
          render={renderProps => (
            <FacebookButton onClick={renderProps.onClick}>Continue with Facebook</FacebookButton>
          )}
        />
      </div>
    )
    
  }
}


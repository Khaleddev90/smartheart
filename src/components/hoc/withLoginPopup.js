import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginRegister from 'components/Main/LoginRegister'
import { togglePopup } from 'reducers/UI'
import { authorize, clearError } from 'reducers/auth'

export default function withLoginPopup(WrappedComponent) {
  class LoginWrapper extends React.Component {
    state = {
      login: '',
      password: '',
      fullname: '',
      username: '',
      pwRegister: '',
      email: '',
      rememberme: false,
    };

    //for login handler
    loginHandler = (e) => {
      this.setState({
        login: e.target.value
      })
    };

    passwordHandler = (e) => {
      this.setState({
        password: e.target.value
      })
    };

    setLoginHandler = () => {
      const { authorize } = this.props;
      const { login, password, rememberme } = this.state;
      authorize(login, password, rememberme);
      
    };

    //for register handler
    fullnameHandler = (e) => {
      this.setState({
        fullname: e.target.value
      })
    };
    usernameHandler = (e) => {
      this.setState({
        username: e.target.value
      })
    };
    pwRegisterHandler = (e) => {
      this.setState({
        pwRegister: e.target.value
      })
    };
    emailHandler = (e) => {
      this.setState({
        email: e.target.value
      })
    };
    setRegisterHandler = () => {

    }
    rememberHandler = (e) => {
      this.setState({
        rememberme: e.target.value
      })
    }


    closePopup = () => {
      const { togglePopup, clearError } = this.props;
      clearError();
      togglePopup({ type: 'login', isToggled: false });
      this.setState({login: '', password: ''});
    };

    render() {
      const {
        login,
        password,
      } = this.state;
      const {
        togglePopup,
        error,
        popup: { type, isToggled, message },
      } = this.props;

      return (
        <React.Fragment>
          <LoginRegister
            password={password}
            isError={error}
            isCredentialsSet={!!(login && password)}
            setLoginHandler={this.setLoginHandler}
            passwordHandler={this.passwordHandler}
            loginHandler={this.loginHandler}
            openPopup={() => togglePopup({ type: 'login', isToggled: true })}
            closePopup={() => this.closePopup()}
            isPopupOpen={isToggled && type === 'login'}
            message={message}
            fullnameHandler={this.fullnameHandler}
            usernameHandler={this.usernameHandler}
            pwRegisterHandler={this.pwRegisterHandler}
            emailHandler={this.emailHandler}
            setRegisterHandler={this.setRegisterHandler}
            rememberHandler={this.rememberHandler}
          />
          <WrappedComponent data={this.state.data} {...this.props} />
        </React.Fragment>
      )
    }
  }

  const mapDispatchToProps = dispatch => bindActionCreators({
    togglePopup,
    authorize,
    clearError
  }, dispatch);

  const mapStateToProps = state => ({
    popup: state.UI.popup,
    token: state.auth.token,
    error: state.auth.error
  });

  return connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);
}
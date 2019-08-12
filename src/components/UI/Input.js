import React, { Component } from 'react'
import styled from 'styled-components'

export default class Input extends Component {
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

  render() {
    const { styles, placeholder, password, passwordHandler, loginHandler } = this.props
    const { isPasswordType } = this.state

    if (password) {
      return (
        <PasswordItem>
          <Item
            onChange={(e) => passwordHandler(e)}
            type={isPasswordType ? 'password' : 'text'}
            style={styles}
            placeholder='Password'
          />
          <PassShow onClick={() => this.showPassword()}>show</PassShow>
        </PasswordItem>
      )
    } else {
      return (
        <Item
           style={styles}
           placeholder={placeholder}
           onChange={(e) => loginHandler(e)} />
      )
    }
  }
}

const Item = styled.input`
  width: 100%;
  border: none;
  font-size: 0.875em;;
  border-bottom: 1px solid #C4C4C4;
  height: 25px;
  padding-bottom: 10px;

  &::placeholder {
    color: #C4C4C4;
    font-size: 0.875em;;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
  }
`

const PasswordItem = styled.div `
  position: relative;
`

const PassShow = styled.div `
  text-transform: uppercase;
  color: #C4C4C4;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.75em;
  position: absolute;
  right: 0;
  top: 4px;
  cursor: pointer;
`
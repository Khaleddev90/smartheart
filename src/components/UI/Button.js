import React from 'react'
import styled from 'styled-components'

const Button = ({text, styles, onClick, isCredentialsSet, isLogin, isActive }) => {

  return (
    <Item
      isActive={isActive}
      isLogin={isLogin}
      isCredentialsSet={isCredentialsSet}
      onClick={onClick}
      style={styles}>{text}</Item>
  )
}

export default Button

const Item = styled.div`
  width: 100%;
  border: 3px solid ${props => {
    if (props.isLogin) {
      if (props.isCredentialsSet) {
        if (props.isActive) {
          return '#FA5B6B'
        } else return '#000'
      } else return '#e6e6e6'
    } else return '#000'
  }};
  padding: 10px 0;
  cursor: pointer;
  border-radius: 7px;
  text-align: center;
  font-size: 0.75em;
  color: ${props => {
    if (props.isLogin) {
      if (props.isCredentialsSet) {
        if (props.isActive) {
          return '#FA5B6B'
        } else return '#000'
      } else return '#e6e6e6'
    } else return '#000'
  }};

  transition: border, color .5s;

  animation: ${props => props.isActive ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : null};
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;

  @keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

  &:focus {
    outline: none;
  }
`
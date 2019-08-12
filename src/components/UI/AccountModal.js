import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class AccountModal extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.__wrappedInstance = node;
    this.__domNode = ReactDOM.findDOMNode(node);
  }

  handleClickOutside(event) {
    if (this.__domNode && !this.__domNode.contains(event.target)) {
      this.props.closeAccountModalHandler();
    }
  }

  render() {
    const {
      isAccountPopupOpen,
      logoutHandler,
      userInfo: { full_name, username },
      toggleAccountModalHandler,
      history
    } = this.props;
    return (
      <Content
        ref={this.setWrapperRef}
        isOpen={isAccountPopupOpen}>
        <Name>{full_name}
          <span>@{username}</span>
          {
            history && history.location.pathname === '/transactions' &&
            <StyledLink
              style={{ color: '#000' }}
              onClick={() => toggleAccountModalHandler()}
              to='/dashboard'>Go to Dashboard</StyledLink>
          }

          <Logout onClick={() => logoutHandler()}>Log out</Logout>
        </Name>
      </Content>
    )
  }
}

export default AccountModal

const Content = styled.div`
  position: absolute;
  width: 220px;
  border-radius: 5px;
  top: 55px;
  right: 50px;
  background: #fff;
  box-shadow: -1px 2px 3px 1px #ccc;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.8)'};
  transition: all .2s;
  z-index: 2;
`

const Name = styled.div`
  font-size: 1.25em;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  justify-content: center;
  align-content: center;


  span {
    color: #ccc;
    font-size: 0.75em;
    position: relative;
    padding-bottom: 5px;
  }

`

const Logout = styled.div`
  text-align: center;
  color: #fd3649;
  font-size: 1.125em;
  cursor: pointer;
  padding-top: 15px;
`

const StyledLink = styled(Link)`
  font-size: 16px;
  color: rgb(35,207,94);
  text-decoration: none;
  position: relative;
    &::after {
      content: '';
      height: 1px;
      background: #ccc;
      width: 105%;
      position: absolute;
      bottom: -10px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%)

  }
`
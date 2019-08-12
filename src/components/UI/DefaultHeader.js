import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Container } from 'components/UI/Container';
import logo from 'assets/heartface-logo-red-3x.png'

export default class Header extends Component {
  handleClick = (e) => {
    const { openPopup, token, history } = this.props
    if (!token) {
      openPopup()
    } else {
      history.push('/dashboard')
    }
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Content>
            <Link to="/">
            <Logo src={logo} alt="Logo"/>
            </Link>
            <RightBlock>
              <Upload onClick={e => this.handleClick(e)}>upload</Upload>
            </RightBlock>
          </Content>
        </Container>
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`
  background-color: #fd3649;
`;

const Content = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;

const RightBlock = styled.div`
  display: flex;
`;
const Upload = styled.div`
 color: #000;
 font-size: 1.5625em;
 font-weight: 900;
 text-transform: uppercase;
 text-decoration: none;
 cursor: pointer;
`;
const Logo = styled.img`
  width: 125px;
  height: 26px;
  @media (max-width: 767px) {
    flex: 0 0 auto;
  }
`;
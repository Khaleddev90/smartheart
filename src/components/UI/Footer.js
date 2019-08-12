import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'components/UI/Container'
import chip from 'assets/chip.png'
import detectMobile from 'utils/detectMobile'

export default class Footer extends Component {

  state = {
    phonenumber: '',
    phoneCountryCode: '+44',
    popupOpen: false,
  }

  handleClick = (e) => {
    const { openPopup, token, history } = this.props;
    if (detectMobile()) {
      this.setState({
        popupOpen: true,
      })
    } else if (!token) {
      openPopup()
    } else {
      history.push('/dashboard')
    }
  };

  //called after enter key
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendSMS()
    }
  }

  sendSMS = () => {
    if (this.state.phonenumber === '')
      return
    window.sendSMS(this.state.phoneCountryCode + this.state.phonenumber)
  }

  render() {
    return (
      <Wrapper>
        <Container color='#202020'>
          <Body>
            <Navigation>
              <GroupOne>
                <LineThree>
                  <NavItem to='/jobs'>JOBS</NavItem>
                  <NavA href='http://blog.heartface.tv/'>BLOG</NavA>
                </LineThree>
                <LineTwo>
                  <NavItem to='/terms-of-use'>TERMS AND CONDITIONS</NavItem>
                  <NavItem to='/privacy-policy'>PRIVACY POLICY</NavItem>
                  <NavItem to='/cookie-policy'>COOKIE POLICY</NavItem>
                </LineTwo>
                <LineOne>
                  <NavItem to='#' onClick={e => this.handleClick(e)}>UPLOAD VIDEO</NavItem>
                  <NavItem to='/how-it-works'>HOW IT WORKS</NavItem>
                  <NavA href='http://heartface.zendesk.com/'>SUPPORT</NavA>
                </LineOne>
              </GroupOne>
              <GroupTwo>
                <Text>
                  Send a link to your phone to download the app.
                </Text>
                <PhoneNumber>
                  <PhoneNumberHeader
                    onChange={e => this.setState({phoneCountryCode:e.target.value})}
                    value={this.state.phoneCountryCode}
                  >
                    <option value='+44'>UK +44</option>
                  </PhoneNumberHeader>
                  <PhoneNumberInput
                    value={this.state.phonenumber}
                    style={{ marginBottom: '20px', marginTop: '10px' }}
                    onChange={e => this.setState({phonenumber:e.target.value})}
                    placeholder='Phone Number'
                    onKeyPress={this.handleKeyPress}
                  />
                </PhoneNumber>
                <PhoneLink onClick={() => this.sendSMS()}>Send Link</PhoneLink>
                <TermsService>
                  By clicking “Send Link”, you agree to the <Span>Terms of Service</Span>
                  <TermsServiceLine2>Message and data rates apply</TermsServiceLine2>
                </TermsService>
              </GroupTwo>
            </Navigation>
          </Body>
          <Mobile>
            <NavItem to='/how-it-works'>HOW IT WORKS</NavItem>
            <NavA href='http://heartface.zendesk.com/'>SUPPORT</NavA>
            <NavItem to='/terms-of-use'>LEGAL</NavItem>
            <NavItem to='/jobs'>JOBS</NavItem>
            <NavA href='http://blog.heartface.tv/'>BLOG</NavA>
          </Mobile>

          <Line>
            <Reserve>© Heartface. All Rights Reserved.</Reserve>
            <Built><Chip src={chip} /> Built in London</Built>
          </Line>
        </Container>
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`
  background: #202020;
  color: #fff;
  width: 100%;
  height: 220px;
  display: inline;
  z-index: 1;
  font-size: 16px;
  bottom: 0px;
  position: relative;

  @media  (min-width: 768px) and (max-width: 1300px) and (orientation :portrait) {
    height: 350px;
  }
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    height: 380px;
  }
  @media (max-width: 767px) {
    height: 380px;
  }

`;

const Body = styled.div`
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  margin: auto;
  margin-top: 44px;
  margin-bottom: 40px;
  @media  (min-width: 768px) and (max-width: 1300px) {
    flex-direction: column-reverse;
    margin-left: auto;
    margin-right: auto;
  }
`;

const GroupOne = styled.div`
  width: 50%
  min-width:460px;
  height: 92px;
  text-transform: uppercase;
  display: inline-block;
  flex-direction: row;
  @media  (min-width: 768px) and (max-width: 1300px) {
    width: 410px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const LineOne = styled.div`
  width: 156px;
  height: 100px;
  display: inline-block;
  float: right;
`;

const LineTwo = styled.div`
  width: 217px;
  height: 100px;
  display: inline-block;
  float: right;
`;

const LineThree = styled.div`
  width: 67px;
  height: 100px;
  display: inline-block;
  float: right;
`;

const GroupTwo = styled.div`
  min-width: 380px;
  width: 50%;
  display: inline-block;
  font-weight: 200;
  @media  (min-width: 768px) and (max-width: 1300px) {
    margin-bottom: 50px;
    width: 510px;
    margin-left: auto;
    margin-right: auto;
  }

`;

const Text = styled.div`
  margin-bottom: 13px;
  margin-left: 70px;
`;

const PhoneNumber = styled.div`
  border: 1px solid #fff;
  width: 280px;
  height: 40px;
  border-radius: 7px;
  display: inline-block;
  margin-left: 70px;
`;

const PhoneNumberHeader = styled.select`
  display: inline-block;
  border: none;
  border-right: 1px solid #fff;
  height: 40px;
  padding-left: 16px;
  width: 83px;
  background-color: transparent;
  overflow: hidden;
  color:#fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

const PhoneNumberInput = styled.input`
  margin-top: 0px !important;
  background: #202020;
  border: 0px;
  margin-left: 20px;
  width: 170px;
  color: #fff;
  &::placeholder {
    color: #a1a1a1;
    font-family: SourceSansPron Light;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
    color: #fff;
  }
`;

const PhoneLink = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight : bold;
  cursor: pointer;
`;

const TermsService = styled.div`
  font-size: 10px;
  margin-top: 7px;
  font-weight: lighter;
  margin-left: 70px;
`;

const TermsServiceLine2 = styled.div`
  font-size: 10px;
  margin-top: 7px;
  font-weight: lighter;
`;

const Span = styled.span`
  color: #4a90e2;
`;

const Mobile = styled.div`
  display: none;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
    text-transform: uppercase;
  }
  @media (max-width: 767px) {
    display: block;
    text-transform: uppercase;
  }
`;
const Line = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  padding: 0px 20px 0px 20px;
  background-color: #202020;
  height: 38px;
  border-top: 2px solid #a1a1a1;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    border-top: 0px;
    margin-top: 35px;
    text-align: center;
    height: 55px;
  }
  @media (max-width: 767px) {
    border-top: 0px;
    margin-top: 25px;
    text-align: center;
    height: 55px;
  }
`;

const Reserve = styled.div`
  font-size: 12px;
  display: inline-block;
  margin-top: 10px;
  font-weight: lighter;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
  }
  @media (max-width: 767px) {
    display: block;
  }
`;

const Built = styled.div`
  font-size: 12px;
  display: inline-block;
  float: right;
  margin-top: 10px;
  font-weight: lighter;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
    float: none;
  }
  @media (max-width: 767px) {
    display: block;
    float: none;
  }
`;

const Chip = styled.img`
`;

const NavItem = styled(Link)`
  text-decoration: none;
  align-self: center;
  color: #ffffff;
  font-weight: 200;
  letter-spacing: 0.25px;
  display: block;
  margin-bottom: 30px;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
    margin-bottom: 0px;
    padding: 20px 0px 20px 50px;
    border-bottom: 1px solid;
  }
  @media (max-width: 767px) {
    display: block;
    margin-bottom: 0px;
    padding: 20px 0px 20px 50px;
    border-bottom: 1px solid;
  }

`;


const NavA = styled.a`
  text-decoration: none;
  align-self: center;
  color: #ffffff;
  font-weight: 200;
  letter-spacing: 0.25px;
  @media  (min-width: 768px) and (max-width: 812px) and (orientation :landscape) {
    display: block;
    padding: 20px 0px 20px 50px;
    border-bottom: 1px solid;
  }
  @media (max-width: 767px) {
    display: block;
    padding: 20px 0px 20px 50px;
    border-bottom: 1px solid;
  }
`;

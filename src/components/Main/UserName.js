  
import React, { Component } from 'react'
import arrowImg from 'assets/rightarrow@2x.png'

import {
  SubtitleUser,
  FBUsernameCheck,
  Row,
  ArrowImg,
  SubtitleSetUsername,
  UserFinalButton,
  TermsDiv,
  TermsLink,
  CheckMark,
  ColumnOne,
} from './StyledElements'

export default class UserName extends Component {
   
  render () {
    const {
      fbusername,
      fbusernameHandler,
      setFbUsernameHandler,
      usernameavailable,
    } = this.props
    return (
      <div>
        <SubtitleUser>Continuing with Facebook</SubtitleUser>
        <Row>
          <SubtitleSetUsername>Please set a username</SubtitleSetUsername>
        </Row>
        <Row>
          <ColumnOne>
            <FBUsernameCheck value={fbusername} onChange={(e) => fbusernameHandler(e)} />
            <CheckMark visible={usernameavailable}>✓</CheckMark>
          </ColumnOne>
        </Row>
        <Row>
          <TermsDiv>By continuing you agree to our <TermsLink to='/terms-of-use'>Terms of Use</TermsLink> and <TermsLink to='/privacy-policy'>Privacy Policy</TermsLink></TermsDiv>
        </Row>
        <Row>
          <UserFinalButton
            isActive={true}
            isLogin
            onClick={() => setFbUsernameHandler()}

          >
            <ArrowImg src={arrowImg}/>
          </UserFinalButton>
        </Row>
        
      </div>
    )
    
  }
}


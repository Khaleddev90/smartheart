  
import React, { Component } from 'react'
import arrowImg from 'assets/rightarrow@2x.png'

import {
  SubtitleGender,
  OptionDiv,
  StepDiv,
  Row,
  ArrowImg,
  GenderItem,
  CustomDatePicker,
  SubtitleBirthdate,
  FinalButton,
} from './StyledElements'

export default class GenderBirthdate extends Component {
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
  
  render () {
    const {
      setGenderBithdateHandler,
      genderHandler,
      birthdateHandler,
      gender,
      isError,
      birthdate,
    } = this.props

    return (
      <div>
        <StepDiv>Step 2 of 4</StepDiv>
        <SubtitleGender>Gender</SubtitleGender>
        <Row>
          
          <OptionDiv>
            <GenderItem name="man" id="man" value="man" checked={gender === 'man'} onClick={(e)=>genderHandler(e)}>
              <label ref="man"><span role='img' aria-label='alert' >🍌</span>  I'm a man</label>
              <div>✓</div>
            </GenderItem>
            <GenderItem name="woman" id="woman" value="woman" checked={gender === 'woman'} onClick={(e) => genderHandler(e)}>
              <label htmlFor="woman"><span role='img' aria-label='alert' >🍑</span>  I'm a woman</label>
              <div>✓</div>
            </GenderItem>
            <GenderItem name="other" id="other" value="other" checked={gender === 'other'} onClick={(e) => genderHandler(e)}>
              <label htmlFor="other"><span role='img' aria-label='alert' >🍒</span>  Non-binary/Other</label>
              <div>✓</div>
            </GenderItem>
          </OptionDiv>
        </Row>
        
        <Row>
          <SubtitleBirthdate>Birthdate</SubtitleBirthdate>
        </Row>
        <Row>
          <CustomDatePicker value={birthdate} dateFormat='dd/MM/yyyy' onChange={(date) => birthdateHandler(date)} />
        </Row>
        <Row>
          <FinalButton
            isActive={isError}
            isLogin
            onClick={() => setGenderBithdateHandler()}

          >
            <ArrowImg src={arrowImg}/>
          </FinalButton>
        </Row>
        
      </div>
    )
    
  }
}


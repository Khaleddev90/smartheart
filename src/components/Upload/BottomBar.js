import React from 'react'
import styled from 'styled-components'
import { NextButton } from './Steps/StyledElements'


export default class BottomBar extends React.Component {
  render() {
    const {currentStep, handleCantFind, handleNextStep, validFields, isUploaded, isRequestProduct} = this.props

    let nextTitle, nextButton, disabled, alt, cantFind
    switch (currentStep) {
      case 1:
        disabled = validFields.size < 2
        alt = disabled?'Please fill title and description':'Proceed to tagging products'
        nextTitle = 'tag products'
        nextButton = 'Next'
        break

      case 2:
        nextButton = 'Publish'
        nextTitle = 'publish your video'
        cantFind = true

        if (isRequestProduct) {
          disabled = false
          alt = 'Publish video'
        } else if (validFields.size < 3) {
          disabled = true
          alt = 'Please select at least one product'
        } else {
          disabled = false
          alt = 'Publish video'
        }

        if (!isUploaded) {
          disabled = true
          alt = 'Please wait for video upload'
        }
        break

      case 3:  // Finish step, no button is shown
        break

      default:
        console.log('wrong step')
    }

    if(currentStep < 3) {
      return  <ProgressStatus>
        <NextStep>
          <LeftDiv>
            {
              cantFind
              ?
                <CantfindText onClick={handleCantFind}>
                  Can't find a product?
                </CantfindText>
              :
              <div />
            }
          </LeftDiv>
          <RightDiv>
            <NextText>
              <NextSpan>Next step:</NextSpan> {nextTitle}&nbsp;&nbsp;
              <NextButton onClick={handleNextStep} disabled={disabled} title={alt}>{nextButton}</NextButton>
            </NextText>
          </RightDiv>
        </NextStep>
      </ProgressStatus>
    }
    return <div/>
  }
}

const LeftDiv = styled.div`
  float: left;
`

const RightDiv = styled.div`
  float: right;
`

const NextSpan = styled.span`
  font-weight: bold;
`

const ProgressStatus = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  margin: auto;
  background-color: #9013FE;
  text-align: center;
`;

const NextStep = styled.div`
  width: 1040px;
  margin: 15px auto;
`

const NextText = styled.div`
  font-size: 16pt;
  color: #fff;
`;

const CantfindText = styled.div`
  font-size: 16pt;
  color: #fff;
  margin-top: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

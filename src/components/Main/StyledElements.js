import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {DateInput} from '@opuscapita/react-dates'
import facebook_icon from '../../assets/facebook-icon.png'
export const Subtitle = styled.h5`
  color: #2a2a2a;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 35px;
`

export const ItemBase = styled.input`
  border: none;
  font-size: 18px;
  border-bottom: 1px solid #C4C4C4;
  height: 25px;
  padding: 6px 0;

  &::placeholder {
    color: #C4C4C4;
    font-size: 0.875em;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
  }
`

export const Item = styled(ItemBase)`
  width: 100%;
`

export const FBUsername = styled(Item)`
  width: 100%;
`

export const CheckItem = styled(ItemBase)`
  padding: 6px 20px 6px 0px;
`

export const FBUsernameCheck = styled(CheckItem)`
  width: 100%;
`

export const PasswordItem = styled.div `
  position: relative;
`
export const RememberDiv = styled.div `
  position: relative;
  display: inline-flex;
  width: 100%;
`

export const PassShow = styled.div `
  text-transform: uppercase;
  color: #4a4a4a;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.75em;
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 20px;
`

export const PassShow1 = styled(PassShow)`
  top: 10px;
`

export const RememberCheck = styled.input`
  margin-right: 10px;
  border: none;
  font-size: 0.875em;;
  border-bottom: 1px solid #4a4a4a;
  height: 25px;
  padding-bottom: 10px;

  &::placeholder {
    color: #4a4a4a;
    font-size: 0.875em;;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
  }
`

export const ForgotPassword = styled.div `
  color: #4a90e2;
  line-height: 24px;
  letter-spacing: 2px;
  font-size: 14px;
  position: absolute;
  right: 0;
  cursor: pointer;
`

export const CustomButton = styled.div`
  border: 3px solid #000;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 7px;
  text-align: center;
  fontSize: 18px;
  color: #000;
  -webkit-transition: border,color .5s;
  transition: border,color .5s;
  -webkit-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
  border: none;
`
export const SignButton = styled.div`
  fontSize: 18px;
  color: #fff;
  font-weight: bold;
  margin-left: 6px;
  cursor: pointer;

`

export const NextButton = styled(CustomButton)`
  background-color: ${props => props.disabled ? '#d8d8d8' : '#fd3649'};
  
  display: inline-flex;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  color: white;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
  float: right;
  margin-left: auto;

  &:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
    height: 0;
  }
 img {
  width: 22px;
  height: 10px;
  margin-top: 21px;
  margin-left: 15px;
  margin-right: 15px;
  }

`
export const ArrowImg = styled.img`
  
`
export const FacebookButton = styled(CustomButton)`

  box-sizing: border-box;
  position: relative;
  margin: auto;
  padding: 0 15px 0 43px;
  border: none;
  text-align: left;
  line-height: 30px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 14px;
  color: #FFF;
  width: fit-content;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }

  background-color: #4C69BA;
  text-shadow: 0 -1px 0 #354C8C;

  &:before {
    background: url(${facebook_icon}) 0px 0px no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
    margin-left: 6px;
    transform: translateY(-50%);
    top: 50%;
  }
  &:hover,
  &:focus {
    background-color: #5B7BD5;
  }

  margin-top: 30px;
  margin-bottom: 30px;
`

export const Content = styled.div `
  padding: 0px 0px;
  box-sizing: border-box;
  margin-bottom: -10px;
`

export const SubContent = styled.div `
  padding: 15px 180px;
  box-sizing: border-box;
`

export const NoneAcc = styled.div `
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  padding: 30px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background: linear-gradient(135deg, rgba(4,0,41,1) 0%,rgba(144,19,254,1) 100%); / W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ /

`

export const Column = styled.div`
  float: left;
  width: calc(50% - 20px);
  margin-bottom: 15px;
  position: relative;
`

export const Row = styled.div`
  content: '';
  display: flex;
  clear: both;
  width: 100%;
  justify-content: space-between;

`
export const Label = styled.label`
  font-size: 16px;
  font-weight: normal;
  color: #4a4a4a;
  margin-top: 4px;
`

export const TermsLink = styled(Link)`
  color: #9b9b9b;
  text-decoration: underline;

  &:hover,
  &:focus {
    color: #2a2a2a;
  }
`;

export const TermsDiv = styled.div`
  color: #9b9b9b;
  font-size: 10px;
  font-weight: 100;
`

export const HrOr = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  margin-top: 40px;
  &:before {
    content: '';
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: #818078;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 .5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
`

//step
export const StepDiv = styled.div`
  color: #9b9b9b;
  font-size: 12px;
  font-weight: 100;
  padding-left: 10px;
  padding-bottom: 10px;
  margin-top: 50px;
`

export const SubtitleGender = styled(Subtitle)`
  margin-top: 0px;
  margin-bottom: 10px;
`

export const SubtitleUser = styled(Subtitle)`
  margin-top: 50px;
  margin-bottom: 10px;
`

export const SubtitleSetUsername = styled(Subtitle)`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
`

export const SubtitleBirthdate = styled(Subtitle)`
  margin-top: 40px;
  margin-bottom: 30px;
`

export const OptionDiv = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
`

export const GenderItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #D8D8D8;
  color: ${props=>props.checked? '#333': '#c3bfbf'};
  cursor: pointer;

  label {
    padding-right: 35px;
    position: relative;
    display: block;
    font-size: 18px;
    padding: 15px 0;
  }

  div{
    display: flex;
    align-items: center;
    color: #fd3649;
    opacity: ${props=>props.checked? '1': '0'};
  }

  input[type="radio"] {
  }
  input[type="radio"] + label {

  }
  input[type="radio"]:checked + label {

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 19px;
      right: 0;
      width: 3px;
      height: 8px;
      border: solid #c;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      
    }
  }
`

export const CustomDatePicker = styled(DateInput)`
  border-radius: 10px;
  font-size: 18px;

  .opuscapita_input-addon-button {
    display: none;
  }

  .opuscapita_date-input__variants-btn {
    display: none;
  }

  .opuscapita_date-input-field input {
    width: 220px;
    height: 100%;
    border: solid 1px #d8d8d8 !important;
    letter-spacing: 8px;
    outline: none;
    border-radius: 8px;
    color: #2A2A2A;
    padding: 6px;
    text-align: center;
  }
`

export const FinalButton = styled(NextButton)`
  margin-top: 20px;
  margin-bottom: 40px;
`

export const UserFinalButton = styled(NextButton)`
  margin-bottom: 180px;
`

export const Errordiv = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`

export const CheckMark = styled.div`
  text-transform: uppercase;
  display: ${props => props.visible ? 'block' : 'none'};
  color: #fd3649;
  font-weight: bold;
  font-size: 0.75em;
  position: absolute;
  cursor: pointer;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
`

export const ColumnOne = styled(Column)`
  display: flex;
  margin-bottom: 15px;
  position: relative;
`
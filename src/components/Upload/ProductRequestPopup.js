import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from 'components/UI/Popup'
import Dropzone from 'react-dropzone'

export default class ProductRequestPopup extends Component {

  render () {
    const {
        closePopup,
        isPopupOpen,
        model,
        errors,
        handleChangeModel,
        submitProductRequest,
      } = this.props
    let NoSelected = (model.file && model.file.length > 0)
    ?
    model.file.map(f => f.name)
    :
    'No image selected'

    let enabled = errors.name === '' && errors.colour === '' && model.name !== '' && model.colour !== ''

    return (
      <Popup
        isPopupOpen={isPopupOpen}
        title='PRODUCT REQUEST'
        width='784px'
        styles={{
              cross:{display:'none'},
              arrow:{display:'none'},
              header:{backgroundColor:'inherit',
              padding: '40px 0px 0px 44px',
              WebkitJustifyContent: 'inherit',
              justifyContent: 'inherit',
              height: 'auto'},
              title:{color:'black',
              fontSize: '24px'},
             }}
              >
        <Content>
          <Subtitle>Enter some info about your item so we can add it to our database.</Subtitle>
          <Label>Name</Label>
          <Input isValid={errors.name === ''}
            value={model.name}
            onChange={(e) => handleChangeModel('name', e.target.value)}
          />
          <HelpText>{errors.name}</HelpText>
          <SecondDiv>
            <ColorInput>
              <Label>Colour</Label>
              <Input isValid={errors.colour === ''}
                value={model.colour}
                onChange={(e) => handleChangeModel('colour', e.target.value)}
              />
            </ColorInput>
            <StyleCodeInput>
              <Label>Style Code<LightText>(optional)</LightText></Label>
              <Input
                isValid='true'
                value={model.stylecode}
                onChange={(e) => handleChangeModel('stylecode', e.target.value)}
              />
            </StyleCodeInput>
          </SecondDiv>
          <HelpText>{errors.colour}</HelpText>
          <Label>Notes<LightText>(optional)</LightText></Label>
          <Note onChange={(e) => handleChangeModel('notes', e.target.value)} value={model.notes} />
          <Label>Upload Photo<LightText>(optional)</LightText></Label>
          <div>
            <ChooseButton
              onDrop={(file) => handleChangeModel('file', file)}
              multiple={false}
              accept="image/*"
            >Choose File
            </ChooseButton>
            <NoImage>{NoSelected}</NoImage>
          </div>

          <SubmitButton disabled={!enabled} onClick={() => (enabled) ? submitProductRequest() : '' } >SUBMIT</SubmitButton>
          <CancelButton onClick={() => closePopup() } >CANCEL</CancelButton>
        </Content>
      </Popup>
    )
  }
}

const SecondDiv = styled.div`
  height: 100px;
`

const Button = styled.div`
  width: 100%;
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

const SubmitButton = styled(Button)`
  width: 200px;
  float: right;
  color: white;
  margin: 15px 0px 15px 0px;
  padding: 15px 0px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 0px;
  background-color: #C6C6B5;
  cursor: pointer;
  background-color: ${props => props.disabled ? '#C6C6B5' : '#fd3649'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const CancelButton = styled(Button)`
  width: 200px;
  float: right;
  color: white;
  margin: 15px 20px 15px 0px;
  padding: 15px 0px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 0px;
  color: #525252;
  background-color: #fff;
  cursor: pointer;
`

const Subtitle = styled.h5`
  color: #2a2a2a;
  font-size: 18px;
  font-weight: normal;

`

const Content = styled.div `
  padding: 0px 44px;
  box-sizing: border-box;
  margin-top: -15px;
`
const HalfDiv = styled.div`
  display: inline-block;
  width: 43%;
`

const Label = styled.label`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  display: inline-flex;
`
const HelpText = styled.div`
  color: #fd3649;
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 300;
`;

const Input = styled.input`
  height: 50px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #979797;
  width: 100%;
  border: ${props => props.isValid ? '1px solid #979797' : '1px solid #fd3649'};
  padding: 14px 28px;
  font-size: 20px;
  box-sizing: border-box;
  :focus {
    outline: none;
    border-color: ${props => props.isValid ? '#2b2b2b' : '#fd3649'};
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #a1a1a1;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    opacity: 1; /* Firefox */
  }
`
const Note = styled.textarea`
  height: 120px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #979797;
  border-style: solid;
  font-size: 20px;
  width: 100%;
`

const ColorInput = styled(HalfDiv)`
  float: left;
`

const StyleCodeInput = styled(HalfDiv)`
  float: right;
`

const LightText = styled.div`
  font-weight: 100;
  color: #2a2a2a;
  margin-left: 4px;
`
const ChooseButton = styled(Dropzone)`
  width: 200px;
  border: 2px solid #FD3649;
  border-radius: 12px;
  font-size: 24px;
  padding: 12px 0px;
  color: #fd3649;
  display: inline-block;
  cursor: pointer;
  text-align: center;
`
const NoImage = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: inline-block;
  margin-left: 20px;
`

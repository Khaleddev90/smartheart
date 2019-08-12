import React from 'react'
import styled from 'styled-components'
import Popup from 'components/UI/Popup'
import Button from '../UI/Button'

import Stores from './Stores'

export const ChangeModal = ({
  isPopupOpen,
  closePopup,
  resetProductBoxHandler,
  removeProduct,
  selectedItem,
  deleteProductUrl
}) => {


  const handleClose = () => {
    deleteProductUrl()
    resetProductBoxHandler()
    closePopup()
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      title='Change product'>
      <Content>
        <Subtitle>Are you sure?</Subtitle>
        <Text>If you are, have a different URL ready to replace this one with.</Text>
        <Button
          onClick={() => handleClose()}
          styles={{ marginBottom: '10px', width: '55%' }}
          text="Yes, i'm sure" />
        <Button
          onClick={closePopup}
          styles={{ marginBottom: '10px', width: '55%' }}
          text="Nope, go back" />
      </Content>
    </Popup>
  )
}

export const StoreModal = ({
  isPopupOpen,
  closePopup,
  togglePopup }) => {

  const styles = {
    header: {
      backgroundColor: '#fff',
      borderBottom: '1px solid #EBEBEB',
    },
    title: {
      color: 'black',
    },
    cross: {
      color: 'black',
    },
    wrapper: {
      width: '580px'
    }
  }

  const handleClick = () => {
    closePopup()
    togglePopup({ type: 'error', isToggled: true })
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      title="Compatible Stores"
      styles={styles}
      arrowClick={() => handleClick()}
    >
      <StoreContent>
        <Stores />
      </StoreContent>
    </Popup>
  )
}

export const ErrorModal = ({
  isPopupOpen,
  closePopup,
  togglePopup,
  history,
}) => {

  const handleClick = () => {
    closePopup()
    togglePopup({ type: 'stores', isToggled: true })
  }

  const handleClose = () => {
    closePopup()
    history.push('/success')
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      title={
        <div>
          Store not supported <span role='img' aria-label='money-mouth face' >😧</span>
        </div>
      }
    >
      <Content>
        <Subtitle>Oops</Subtitle>
        <Text>
          failedurl.com doesn't seem compatible.
          We're working on it through.
          Until then, try a different store.
        </Text>
        <Button
          onClick={() => handleClick()}
          styles={{ marginBottom: '10px', width: '55%' }}
          text="See compatible stores" />
        <SubText
          onClick={() => handleClose()}>Publish without tagging</SubText>
      </Content>
    </Popup>
  )
}

export const NoTagError = ({
  isPopupOpen,
  closePopup,
  publishNoTagHandler
}) => {

  const handleClose = () => {
    closePopup()
    publishNoTagHandler()
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      title={
        <div>
          Alert! <span role='img' aria-label='alert' >⚠️</span>
        </div>
      }
    >
      <Content>
        <Subtitle>Oops</Subtitle>
        <Text>
          You must tag at least one product!
        </Text>
        <SubText
          onClick={() => handleClose()}>Continue Anyway</SubText>
      </Content>
    </Popup>
  )
}


const Content = styled.div `
  padding: 15px 20px 0;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StoreContent = styled.div `
  max-height: 500px;
  overflow: scroll;
`

const Subtitle = styled.div `
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 15px;
`

const Text = styled.div `
  font-size: 0.875em;;
  margin-bottom: 25px;
  padding: 0 50px;
`

const SubText = styled.div `
  font-size: 0.625em;
  color: #BBBBBB;
  margin-bottom: 10px;
  cursor: pointer;
`
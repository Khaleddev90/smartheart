import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Icon } from 'react-fa'

class Popup extends Component {


  render() {

    const {
      closePopup,
      children,
      isPopupOpen,
      title,
      styles,
      arrowClick,
      isError,
      width,
     } = this.props

    return (
      <Wrapper isOpen={isPopupOpen}>
        <Cover
          onClick={closePopup}
          isOpen={isPopupOpen} />
        <PopupContent
          isOpen={isPopupOpen}
          style={styles && styles.wrapper}
          width={width}>
          <Header
            isError={isError}
            style={styles && styles.header}>
            <HeaderTitle style={styles && styles.title}>{title}</HeaderTitle>
          </Header>
          {
            styles &&
              <ArrowWrapper
                onClick={arrowClick}
                style={styles && styles.arrow}
                name="angle-left"
                size='2x'
              />
          }
          <IconWrapper
            onClick={closePopup}
            style={styles && styles.cross}
            name="close"
            size='2x'
          />
          {children}
        </PopupContent>
      </Wrapper>
    )
  }
}

export default withRouter(Popup)

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => props.isPopupOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all .4s 0.2s;
  z-index: 2;
  height: 100%;
`

const Header = styled.div `
  background-color: ${props => props.isError ? '#FA5B6B' : '#A871F2'};
  height: 50px;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .4s;
`

const HeaderTitle = styled.div `
  font-size: 1.25em;
  color: #fff;
  font-weight: bold;
`

const Cover = styled.div `
  transition: .2s .2s all;
  background-color: #000;
  opacity: ${props => props.isOpen ? '0.9' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const PopupContent = styled.div `
  position: relative;
  width: ${props => props.width !== undefined ? props.width : '360px'};
  background-color: #fff;
  z-index: 2;
  border-radius: 10px;
  padding-bottom: 10px;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.8)'};
  transition: all .2s .2s;
  border-radius: 25px 25px 27px 27px;
`

const IconWrapper = styled(Icon) `
  color: #fff;
  position: absolute;
  right: 15px;
  top: 8px;
  cursor: pointer;
`

const ArrowWrapper = styled(Icon) `
  color: black;
  position: absolute;
  left: 15px;
  top: 10px;
  cursor: pointer;
`
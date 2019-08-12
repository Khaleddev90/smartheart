import React from 'react'
import styled from 'styled-components'
import { Icon } from 'react-fa'
import loader from 'assets/Flask-3s-200px.svg'

const ProductView = ({
  togglePopup,
  isProductLoading,
  setProductUrlHandler,
  isProductUrlSet,
  productUrl,
  doSetProductUrl,
  changeProductBoxHandler,
  resetProductBoxHandler,
  productTagCurrent: {
    isSet,
    isActive,
    description,
    id,
    name,
    pictures,
    primary_picture,
    supplier_info,
    url,
    boxIndex
  },
  isProductUrlRequested,
  productError,
  doSetProductUrlonClick,
  isBoxNotActive,
  isUrlValid
    }) => {

  if (!isProductUrlRequested && !isSet) {

    return (
      <ProductUrl
        isActive={isProductUrlRequested}>
        <ProductUrlArea
          onKeyDown={doSetProductUrl}>
          <ProductUrlInput
            type='text'
            isUrlValid={isUrlValid}
            isBoxNotActive={isBoxNotActive && isActive}
            placeholder='Paste your product URL here  🙌🏼'
            onChange={e => setProductUrlHandler(e)}
            value={productUrl}
            onfocus="this.placeholder=''" />
          <FetchButton
            isUrlValid={isUrlValid}
            isActive={productUrl && productUrl !== ''}
            onClick={() => doSetProductUrlonClick()}>
            {isUrlValid ? 'Fetch' : 'Please, insert a valid URL'}
          </FetchButton>
        </ProductUrlArea>
      </ProductUrl>
    )
  } else {

    return (
      <ProductUrl
        isBoxNotActive={(isBoxNotActive || isBoxNotActive === 0) && !isActive}
        isActive={!isProductLoading}>
        {

          isProductLoading
            ?
            <Loader src={loader} />
            :
            <ProductViewWrapper
              isProductLoading={isProductLoading}
              isChanged={isActive}>
              <ProductOffer
                isChanged={isActive}>
                <ProductImages>
                  <ProductImage
                    src={primary_picture}
                  />
                </ProductImages>
                <ProductDescription>
                  <ProductDescriptionText>
                    {name}
                    <span>£ {supplier_info &&
                      supplier_info[0].price}</span>
                  </ProductDescriptionText>
                </ProductDescription>
                {!isActive &&
                <ProductOfferTriangle name="play"/>}
              </ProductOffer>
              {
                !isActive
                  ?
                  (<ProductCheck
                    isChanged={isActive}>
                    <ProductCheckTitle>is this product correct?</ProductCheckTitle>
                    <ProductButton
                      isBoxNotActive={(isBoxNotActive || isBoxNotActive === 0) && !isActive}
                      color={"#00a651"}
                      onClick={() => changeProductBoxHandler()}>Yes</ProductButton>
                    <ProductButton
                      color={"#888"}
                      onClick={() => resetProductBoxHandler()}>Try differnt link</ProductButton>
                  </ProductCheck>)
                  :
                  (<ProductCheck
                    isChanged={isActive}>
                    <ProductButton
                      border
                      color={"black"}
                      href={supplier_info[0].link}
                      target='_blank'
                      >View</ProductButton>
                    <ProductButton
                      color={"gray"}
                      onClick={() => togglePopup({type: 'change', isToggled: true})}>Change</ProductButton>
                  </ProductCheck>)
              }
            </ProductViewWrapper>
        }
      </ProductUrl>
    )
  }
}

export default ProductView

const ProductUrl = styled.div `
  margin-top: 20px;
  border-radius: 5px;
  border: ${props => props.isActive
  ? null
  : '3px solid #e6e6e6'};
  height: 270px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .4s;
  position: relative;
  animation: ${props => props.isBoxNotActive ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : null};
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;

  @keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

`

const ProductUrlArea = styled.label`
  padding: 15px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  resize: none;
  border: none;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

const ProductUrlInput = styled.input`
  resize: none;
  border: none;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  width: 100%;
  font-size: 1.625em;
  color: ${props => props.isUrlValid ? '#000' : '#ddd'};
  text-align: center;
  margin: 50px 0 20px 0;
  animation: ${props => props.isBoxNotActive ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : null};

  &:focus {
    outline: none;
  }

  &:focus::-webkit-input-placeholder  {transition: all 0.3s ease-out; color:transparent;}
  &:focus::-moz-placeholder   {transition: all 0.3s ease-out; color:transparent;}
  &-moz-placeholder   {transition: all 0.3s ease-out; color:transparent;}
`
const FetchButton = styled.div`
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  opacity: ${props => props.isActive ? '1' : '0'};
  height: 60px;
  min-width: 130px;
  padding: 0 5px;
  border-radius: 5px;
  background: ${props => props.isUrlValid ? '#2979FF' : '#A871F2'};
  color: #fff;
  font-size: 1.25em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity .3s 1.5s, visibility .3s 1.5s;
  cursor: pointer;
  position: relative;
  line-height: 0;
  margin-right: 10px;

`
const Loader = styled.img`
  height: auto;
  width: 100px;
`
const ProductViewWrapper = styled.div`
  transition: all .3s;
  background-color: #000;
  width: 100%;
  height: 100%;
  padding: ${props => props.isChanged ? '8px' : '15px'};
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const ProductOffer = styled.div `
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  width: ${props => props.isChanged ? '100%' : '60%'};
  position: relative;
  transition: all .5s;
  will-change: width;
`
const ProductImages = styled.div`
  display: flex;
  height: 200px;
  margin-right: 50px;
`

const ProductImage = styled.img`
  width: auto;
  height: 100%;
  margin: 10px 0;
`

const ProductDescription = styled.div `
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const ProductDescriptionText = styled.div `
  font-size: 1.25em;
  font-weight: 600;
  max-width: 240px;
  margin: 15px;
  display: flex;
  flex-direction: column;

  span {
    color: #9071AE;
    font-size: 1.125em;
    font-weight: 500;
    margin-top: 20px;
  }
`

const ProductOfferTriangle = styled(Icon) `
  position: absolute;
  right: -1px;
  top: 40%;
  font-size: 3.125em !important;
  transform: rotate(180deg);
`

const ProductCheck = styled.div `
  display: flex;
  width: 27%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
  text-align: center;
  position: absolute;
  top: ${props => props.isChanged ? '41%' : '25%'};
  right: 4.5%;
`

const ProductCheckTitle = styled.div `
  font-size: 1.5em;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #fff;
`

const ProductButton = styled.a`
  transition: all .8s;
  padding: 5px 0;
  width: 100%;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1.25em;
  margin-bottom: 15px;
  color: ${props => props.color === 'black' ? '#000' : '#fff'};
  cursor: pointer;
  border-radius: ${props => props.color === 'black' ? '5px' : '0'};
  border: ${props => props.border ? '3px solid black' : null};
  background-color: ${props => props.color === 'black' ? '#fff' : props.color};
  animation: ${props => props.isBoxNotActive ? 'glowing 1500ms' : null};

  @keyframes glowing {
  0% { background-color: #00ff00 ; box-shadow: 0 0 3px #00ff00 ; }
  50% { background-color: #00ff00 ; box-shadow: 0 0 40px #00ff00 ; }
}
`
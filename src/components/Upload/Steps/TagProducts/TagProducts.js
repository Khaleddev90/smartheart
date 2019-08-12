import React  from 'react'
import styled from 'styled-components'
import ProductView from './ProductView'
import sneaker from 'assets/sneaker.svg'
import { Icon } from 'react-fa'

const TagProducts = ({

  togglePopup,
  isProductUrlSet,
  isProductLoading,
  isProductUrlRequested,
  productUrl,
  selectedItem,
  selectItem,
  productsTags,
  setProductUrlHandler,
  doSetProductUrl,
  isProductBoxChanged,
  resetProductBoxHandler,
  productTagCurrent,
  showBoxesHandler,
  changeProductBoxHandler,
  productError,
  createProductHandler,
  doSetProductUrlonClick,
  isBoxNotActive,
  isUrlValid

    }) => {
  return (
    <Content>
      <TagTitle>Tag Products</TagTitle>
      <TagHeadBar>
        {
          productsTags.map((item, key) => {
            const { primary_picture } = item
            return (
              <TagHeadItem
                isBoxNotActive={isBoxNotActive === key}
                key={key}
                isActive={key === selectedItem}
                onClick={() => selectItem(key)}>
                {
                  primary_picture
                    ?
                    <ProductThumbnail
                      image={primary_picture}
                    />
                    :
                    <SneakerThumbnail
                      image={sneaker}
                    />
                }
              </ TagHeadItem>
            )
          })
        }
        <TagNew
          limit={productsTags.length >= 7}
          onClick={() => createProductHandler()}>
          <Icon name='plus' size='3x' />
        </TagNew>
      </TagHeadBar>
      <ProductView
        isUrlValid={isUrlValid}
        isBoxNotActive={isBoxNotActive}
        doSetProductUrlonClick={doSetProductUrlonClick}
        productError={productError}
        changeProductBoxHandler={changeProductBoxHandler}
        resetProductBoxHandler={resetProductBoxHandler}
        isProductUrlRequested={isProductUrlRequested}
        productTagCurrent={productTagCurrent}
        selectItem={selectItem}
        togglePopup={togglePopup}
        isProductBoxChanged={isProductBoxChanged}
        isProductUrlSet={isProductUrlSet}
        isProductLoading={isProductLoading}
        setProductUrlHandler={setProductUrlHandler}
        productUrl={productUrl}
        doSetProductUrl={doSetProductUrl}
        selectedItem={selectedItem}
      />
    </Content>
  )
}

export default TagProducts

const Content = styled.div`
  margin: 100px 0;
`

const TagTitle = styled.div `
  font-size: 1.5625em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 25px;
`

const TagHeadBar = styled.div `
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  position: relative;
`

const TagHeadItem = styled.div `
  opacity: ${props => props.isActive
  ? '1'
  : '0.7'};
  width: 78px;
  height: 78px;
  margin-right: 30px;
  box-sizing: border-box;
  border-radius: 5px;
  border: ${props => props.isActive
  ? '3px solid #8462A6'
  : '3px dashed #EBEBEB'};
  background-color: ${props => props.isActive
  ? '#EBEBEB'
  : 'none'};
  transition: all 0.3s ease-out;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => props.isBoxNotActive ? 'glowing-tag 1500ms' : null};

  &:hover {
    border: 3px solid #8462A6;
    background-color: #EBEBEB;
  }

  &:last-child {
    margin-right: 0;
  }

  @keyframes glowing-tag {
  0% { box-shadow: 0 0 3px #8462A6 ; }
  50% { box-shadow: 0 0 40px #8462A6 ; }
}
`
const TagNew = TagHeadItem.extend`
  color: #EBEBEB;

  &:hover {
    border: 3px solid ${props => props.limit  ? "#fd3649" : "#8462A6"};
    color: ${props => props.limit  ? "#fd3649" : "#8462A6"};
    animation: ${props => props.limit  ? "shake" : "none"} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

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

const SneakerThumbnail = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-image: ${props => props.image ? `url(${props.image})` : `url(${sneaker})`};
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
`

const ProductThumbnail = styled.div`
   text-align: center;
   width: 100%;
   height: 100%;
   background-image: ${props => props.image ? `url(${props.image})` : `url(${sneaker})`};
   background-size: contain;
   background-position: center;
   background-repeat: no-repeat;
   background-color: #fff;
`
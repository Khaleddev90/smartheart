import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment';

import Popup from 'components/UI/Popup'

export default class UntagPopup extends Component {

  render () {

    const {
        closePopup,
        untagProduct,
        isPopupOpen,
        item,
      } = this.props

    return (
      <Popup
        isPopupOpen={isPopupOpen}
        title='Are you sure you want to un-tag this product?'
        width='600px'
        styles={{
              cross:{display:'none'},
              arrow:{display:'none'},
              header:{backgroundColor:'inherit',
              padding: '20px 0px 0px 30px',
              WebkitJustifyContent: 'inherit',
              justifyContent: 'inherit',
              height: 'auto'},
              title:{color:'black',
              fontSize: '24px'},
             }}
              >
        <Content>
          <Subtitle>Doing so will remove this product form your post.</Subtitle>
          <SearchItem>
            <SearchItemImage picture={item.primary_picture} />
            <SearchItemInfo>
              <SearchItemInfoTitle>{item.name}</SearchItemInfoTitle>
              <SearchItemInfoParams>
                <SearchItemInfoParamsGroup>
                  <SearchItemInfoParamsLabel>Style code:</SearchItemInfoParamsLabel>
                  <SearchItemInfoParamsValue>{item.style_code}</SearchItemInfoParamsValue>
                </SearchItemInfoParamsGroup>
                {
                  item.release_date && (
                    <SearchItemInfoParamsGroup>
                      <SearchItemInfoParamsLabel>Release date:</SearchItemInfoParamsLabel>
                      <SearchItemInfoParamsValue>
                        {moment(item.release_date).format('DD MMMM YYYY')}
                      </SearchItemInfoParamsValue>
                    </SearchItemInfoParamsGroup>
                  )
                }
              </SearchItemInfoParams>
            </SearchItemInfo>
          </SearchItem>

          <Hr />
          <YesButton onClick={() => untagProduct()} >REMOVE PRODUCT</YesButton>

          <NoButton onClick={() => closePopup()} >CANCEL</NoButton>

        </Content>
      </Popup>
    )
  }

}

const Hr = styled.hr`
  background: #d8d8d8;
  height: 1px;
  margin-left: -30px;
  margin-right: -30px;
  border: 0;
`;
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

const YesButton = styled(Button)`
  width: 160px;
  float: right;
  background-color: #fd3649;
  color: white;
  margin: 15px 25px 15px 0px;
`
const NoButton = styled(Button)`
  width: 130px;
  float: right;
  margin: 15px 10px 15px 0px;
  font-weight: bold;
  color: #525252;
`

const Subtitle = styled.h5`
  color:#a2a2a2;
  font-size:16px;
  font-weight: normal;

`

const Content = styled.div `
  padding: 0px 30px;
  box-sizing: border-box;
  margin-top: -15px;
`

const SearchItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0;
  }
`;

const SearchItemImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #979797;
  background-image: ${props => `url(${props.picture})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const SearchItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;
`;

const SearchItemInfoTitle = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SearchItemInfoParams = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchItemInfoParamsGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 35px;
  color: #000000;
  font-size: 18px;
  &:first-child {
    margin-left: 0;
  }
`;

const SearchItemInfoParamsLabel = styled.div`
  font-weight: 600;
`;

const SearchItemInfoParamsValue = styled.div`
  margin-left: 5px;
  color: #a1a1a1;
  font-weight: 400;
`;

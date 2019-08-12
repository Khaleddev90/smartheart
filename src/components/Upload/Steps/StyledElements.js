import styled from 'styled-components'
import sneaker from 'assets/sneaker.svg';


export const Label = styled.h2`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
`;

export const NextButton = styled.button`
  width: 220px;
  height: 50px;
  border-radius: 8px;
  border: none;
  color: #000000;
  background-color: #d8d8d8;
  cursor: pointer;
  transition: background-color .3s;
  font-size: 24px;
  font-weight: 600;

  :enabled:hover,
  :enabled:focus {
    background-color: #f30219;
  }

  :disabled {
    opacity: .65;
    cursor: default;
  }

  :enabled {
    background-color: #fd3649;
    color: white;
  }

  &.red {
    background-color: #fd3649;
  }

  &.blue {
    background-color: #439dff;
  }
`;

export const NavGroup = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  & span {
    margin: 0 20px;
  }
`;

export const TagsGroup = styled.div `
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  overflow-x: auto;
`;

export const TagItem = styled.div `
  width: 75px;
  height: 75px;
  min-width: 75px;
  min-height: 75px;
  margin-right: 30px;
  box-sizing: border-box;
  border-radius: 8px;
  border: ${props => props.isNew ? '4px dashed #a1a1a1' : '4px solid #a1a1a1'}
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  &:hover .fa {
    display: inline-block;
  }
`;

export const ProductThumbnail = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
   background-image: ${props => props.image ? `url(${props.image})` : `url(${sneaker})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
`;

export const RequestedProduct = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
  word-wrap: break-word;
  font-size: 18px;
  overflow: hidden;
`;

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sneaker from 'assets/sneaker.svg';
import pendingVideos from 'assets/pending.svg';

class PendingVideos extends Component {

  render() {
    const {
      title,
      description,
      products,
    } = this.props;
    return (
      <Content>
        <VideoWrapper>
          <Wrapper title={"Your new upload is currently being processed and will appear here shortly."} />
        </VideoWrapper>
        <Info>
          <React.Fragment>
            <Title>
              {title} | {description}
            </Title>
          </React.Fragment>
          <Counters>
            <p>0 views</p>
            <p>just now</p>
          </Counters>
          <TagsGroup>
            {
              products.map((item, index) => (
                <TagItem key={index}>
                  <ProductThumbnail image={item.primary_picture} />
                </TagItem>
              ))
            }
          </TagsGroup>
        </Info>
      </Content>
    )
  }
}

export default PendingVideos;

PendingVideos.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  background-image: url(${pendingVideos});
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 15px;
  background-size: 100px;
  border: 1px solid #cccccc;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  ::after {
    content: '${props => props.title}';
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
    padding: 10px;
  }
`;

const Content = styled.div`
  float: left;
  width: 33.3333%;
  border: 0px solid;
  box-sizing: border-box;
  @media  (max-width: 768px) {
    float: none;
    width: auto;
  }
  color: white;
`

const VideoWrapper = styled.div`
  height: 134px;
  width: 100%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 50px;
`

const Counters = styled.div`
  display: ${props => props.isEditTitle ? 'none' : 'flex'};
  align-items: center;
  
  p {
    font-size: 12px;
    font-weight: lighter;
    margin-block-end: 0px;
    margin-block-start: 0px;
    &:not(:last-child):after {
      content: '·';
      padding: 0 10px;
    }
  }
`

const Title = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`

export const TagsGroup = styled.div `
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow-x: auto;
  min-height: 50px;
`;

export const TagItem = styled.div `
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 0px;
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
  border-radius: 8px;
`;
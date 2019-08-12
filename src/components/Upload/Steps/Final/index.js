import React from 'react'
import styled from 'styled-components'
import TextTruncate from 'react-text-truncate';
import { Label } from '../StyledElements'
import {TagsGroup, TagItem, ProductThumbnail, NextButton} from '../StyledElements'
import { Helmet } from 'react-helmet'

export default class Final extends React.Component {
  render() {
    const { model, video, onDone } = this.props
    const videoSnapshot = video && video.cover_picture;

    const requestedProducts = this.props.requestedtags && this.props.requestedtags.length > 0 ?
      this.props.requestedtags.map((item, index) => (
        <TagItem key={index}>
          <RequestedProduct>
            <TextTruncate
              line={3}
              truncateText="…"
              text={item.name}
            />
          </RequestedProduct>
        </TagItem>
      ))
      :
      <div />
    return <React.Fragment>
      <Helmet>
        <title>Upload Successful</title>
      </Helmet>
      <VideoInfo>
        <Snapshot image={videoSnapshot}>
          {
            !(videoSnapshot) && (
              <VideoLoader>
                <LoaderItem/>
                <LoaderItem/>
                <LoaderItem/>
              </VideoLoader>
            )
          }
        </Snapshot>
        <Label>{model.title}</Label>
        <TagsGroup>
          {
            model.products.map((item, index) => (
              <TagItem key={index}>
                <ProductThumbnail image={item.primary_picture} />
              </TagItem>
            ))
          }
          {requestedProducts}
        </TagsGroup>
      </VideoInfo>
      <NextButton className="red" onClick={onDone}>Back to Dashboard</NextButton>
    </React.Fragment>
  }
}

export const VideoInfo = styled.div`
  width: 520px;
  margin-bottom: 50px;
`;

export const Snapshot = styled.div`
  width: 520px;
  height: 292px;
  background-color: #EBEBEB;
  background-image: ${props => props.image ? `url("${props.image}")` : 'unset'};
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoLoader = styled.div `
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoaderItem = styled.div `
    @keyframes loader {
      0%   {
        background: #fd3649;
        transform: scale(1.3);
    }
      25%  {
        background: #8462A6;
        transform: scale(1.1);
    }
      50%  {
        background: #E1BC97;
        transform: scale(1.3);
    }
      75%  {
        background: #00a651;
        transform: scale(1.1);
    }
      100% {
        background: #fd3649;
        transform: scale(1.3);
    }
  }

  width: 15px;
  height: 15px;
  border-radius: 50%;
  transition: all 0.3s ease-out;
  animation: loader 2s infinite;
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
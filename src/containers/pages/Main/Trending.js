import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { times } from 'lodash';
import ReactPlayer from 'react-player';

class Trending extends React.Component {
  renderLoadingWireframe() {
    let list = [];
    times(this.props.maxVideos, i => {
      list.push(<VideoLoading key={i} />)
    });
    return list;
  }

  render() {
    const {
      isLoading,
      videos,
    } = this.props;
    return (
      <React.Fragment>
        {
          (isLoading || !videos.length) ? (
            this.renderLoadingWireframe()
          ) : (
            videos.map( v => (
              <Video key={v.id} data-label={v.title}>
                <ReactPlayer url={v.videofile} playing loop muted width="100%" height="100%" />
              </Video>
            ) )
          )
        }
      </React.Fragment>
    )
  }
}

Trending.propTypes = {
  maxVideos: PropTypes.number,
  videos: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Trending;

export const Video = styled.div`
  width: 200px;
  height: 113px;
  position: relative;

  :not(:first-child) {
    margin-left: 10px;
  }

  ::after {
    content: attr(data-label);
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
		padding: 10px;
    text-align: center;
		transition:all 0.3s ease-in-out;
  }

  :hover {
    ::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
    :not(:first-child) {
      margin-left: 0;
    }
  }
`;

export const VideoLoading = styled.div`
  width: 200px;
  height: 113px;
  border: 1px solid #979797;
  background-color: #d8d8d8;
  opacity: 0.7;

  :not(:first-child) {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
    :not(:first-child) {
      margin-left: 0;
    }
  }
`;
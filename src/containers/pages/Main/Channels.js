import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { times } from 'lodash';

class Channels extends React.Component {
  renderLoadingWireframe() {
    let list = [];
    times(this.props.maxChannels, i => {
      list.push(<Channel key={i} />)
    });
    return list;
  }

  render() {
    const {
      isLoading,
      channels,
    } = this.props;
    return (
      <React.Fragment>
        {
          (isLoading || !channels.length) ? (
            this.renderLoadingWireframe()
          ) : (
            channels.map( v => (
              <Channel key={v.id} bg={v.photo} />
            ) )
          )
        }
      </React.Fragment>
    )
  }
}

Channels.propTypes = {
  maxChannels: PropTypes.number,
  channels: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Channels;

export const Channel = styled.div`
  width: 75px;
  height: 75px;
  border: 1px solid #979797;
  border-radius: 75px;
  background-color: #d8d8d8;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  :not(:first-child) {
    margin-left: 30px;
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }

  @media (max-width: 576px) {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;
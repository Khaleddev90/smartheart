import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PersonCard = ({ background, size, profilePicture, name, social }) => {
  return (
    <StyledPersonCard
      size={size}
      background={background}
      profilePicture={profilePicture}
    >
      <div className="profile">
        <div className="profile-picture" />
        <div className="profile-info">
          <h4>{name}</h4>
          <p>{social}</p>
        </div>
      </div>
    </StyledPersonCard>
  );
};

PersonCard.propTypes = {
  background: PropTypes.string.isRequired,
  size: PropTypes.number
};

PersonCard.defaultProps = {
  size: 1
};

export default PersonCard;

const StyledPersonCard = styled.div`
  background-image: url("${({ background }) => background}");
  width: 159px;
  height: 214px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 5px solid white;
  border-radius: 4px;
  box-shadow: 0px 0px 5px #909090;
  position: absolute;

  @media (min-width: 768px) {
    width: 240px;
    height: 322px;
  }

  & > .profile {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -15px;
    width: 85%;
    height: 20%;
    background-color: white;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
  }

  .profile-picture {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    border-radius: 50%;
    background-image: url("${({ profilePicture }) => profilePicture}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    @media (min-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }

  .profile-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    & > h4 {
      margin: 0;
      color: #2a2a2a;
      font-size: 10px;
      line-height: 13px;
      font-weight: 400;

      @media (min-width: 768px) {
        font-size: 16px;
        line-height: 21px;
      }
    }

    & > p {
      margin: 0;
      color: #9b9b9b;
      font-size: 9px;
      line-height: 11px;
      font-weight: 400;

      @media (min-width: 768px) {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;

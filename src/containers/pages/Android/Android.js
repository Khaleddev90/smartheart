import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import DefaultLayout from "components/Layout/DefaultLayout";

export default class Android extends React.Component {
  handleClick = () => {
    this.props.togglePopup({ type: "login", isToggled: true });
  };

  render() {
    return (
      <DefaultLayout {...this.props}>
        <Helmet>
          <title>Android</title>
        </Helmet>
        <Container>
          <Introduction>
            <h1>Heartface is not out on Android... yet <span role="img" aria-label="clock">⏳</span></h1>
            <p>
              Estimated release date: <UnderLineText>February &nbsp; 2019</UnderLineText>
            </p>
          </Introduction>
        </Container>
      </DefaultLayout>
    );
  }
}

const UnderLineText = styled.span`
  text-decoration: underline;
  margin-left: 8px;
  font-weight: bold;
  @media (max-width: 767px) {
    display: block;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5% 5% 5%;

  @media (min-width: 768px) {
    margin: 0 10% 5% 10%;
  }
  @media (max-width: 768px) {
    min-height: 568px;
  }
`;

const Introduction = styled.div`
  text-align: center;
  margin-top: 8%;
  color: #2a2a2a;
  font-style: normal;
  font-stretch: normal;
  @media (max-width: 768px) {
    margin-top: 10%;
  }

  & > h1 {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;


    @media (max-width: 767px) {
      font-size: 24px;
      line-height: 31px;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 32px;
      line-height: 51px;
    }

    @media (min-width: 1025px) {
      font-size: 32px;
      line-height: 61px;
    }
  }

  & > p {
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 28px;
      line-height: 26px;
    }

    @media (min-width: 1025px) {
      margin: 0 10%;
      font-size: 28px;
      line-height: 32px;
    }
  }
`;

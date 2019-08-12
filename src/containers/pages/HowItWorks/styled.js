import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5% 5% 5%;

  @media (min-width: 768px) {
    margin: 0 10% 5% 10%;
  }
`;

const Introduction = styled.div`
  text-align: center;
  margin-top: 8%;
  color: #2a2a2a;
  font-style: normal;
  font-stretch: normal;

  @media (min-width: 768px) {
    margin-top: 10%;
  }

  & > h1 {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 38px;
      line-height: 51px;
    }

    @media (min-width: 1025px) {
      font-size: 46px;
      line-height: 61px;
    }
  }

  & > p {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 18px;
      line-height: 26px;
    }

    @media (min-width: 1025px) {
      margin: 0 10%;
      font-size: 24px;
      line-height: 32px;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  justify-content: center;
  margin-top: 8%;
`;

const SectionTitle = styled.h2`
  color: #fd3649;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 38px;
  }
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-top: 5%;
  }

  @media (min-width: 1025px) {
    justify-content: flex-start;
    flex-direction: row;
    margin-top: 7%;
  }
`;

const SectionContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  justify-content: center;
  align-items: center;

  @media (min-width: 1025px) {
    justify-content: space-around;
  }

  & > img {
    max-width: 279px;
    border-radius: 25px;

    @media (min-width: 768px) {
      max-width: 420px;
    }
  }
`;

const SectionContentRight = styled.div`
  color: #2a2a2a;
  text-align: left;
  margin-top: 5%;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 10%;
  }

  @media (min-width: 1025px) {
    margin-top: 0;

    flex-basis: 50%;
    padding-left: 60px;
  }

  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    text-align: left;

    @media (min-width: 768px) {
      font-size: 36px;
      line-height: 48px;
    }
  }

  p {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;

    @media (min-width: 768px) {
      font-size: 17px;
      line-height: 21px;
      margin-top: 15px;
    }
  }

  div {
    margin-top: 7%;
    justify-content: center;
    display: flex;

    @media (min-width: 1025px) {
      margin-top: 0;
      display: ${({ hideDesktop }) => (hideDesktop ? "none" : "flex")};
      justify-content: flex-start;
    }
  }
`;

const ImagesContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    max-width: 420px;
  }

  & > div {
    margin-bottom: 5px;
    max-width: 21%;

    img {
      width: 85%;
    }
  }
`;

const Bottom = styled.div`
  display: none;

  @media (min-width: 1025px) {
    display: flex;
    margin-top: 8%;
    justify-content: center;
  }
`;

const Cards = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-color: #fff5f6;

  @media (min-width: 768px) {
    width: 396px;
    height: 378px;
  }

  > div:first-child {
    left: 0;
  }

  > div:last-child {
    right: -20px;
    top: 20%;

    @media (min-width: 768px) {
      right: -40px;
    }
  }
`;

export {
  Container,
  Cards,
  Section,
  Bottom,
  SectionTitle,
  SectionContent,
  SectionContentLeft,
  SectionContentRight,
  Introduction,
  ImagesContainer
};

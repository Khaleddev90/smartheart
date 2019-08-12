import React  from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import CompanyLayout from 'components/Layout/CompanyLayout';
import { H2 } from 'components/UI/Typography';
import bgImage from 'assets/jobs-banner.jpg';

export default function JobsPage() {
  return (
    <CompanyLayout>
      <Helmet>
        <title>Jobs</title>
      </Helmet>
      <Banner>THE BEST GODDAMN TEAM ON THE PLANET</Banner>
      <Container>
        <BolderH2>Current Openings</BolderH2>
        <Table>
          <tr>
            <Td>
              <CellLink href="https://heartface.workable.com/jobs/780524">Senior Python Engineer</CellLink>
            </Td>
            <Td>Engineering</Td>
            <Td>Regular</Td>
            <Td>London</Td>
          </tr>
        </Table>
      </Container>
    </CompanyLayout>
  )
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 840px;
  padding: 30px 0;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px
  }

  @media (max-width: 576px) {
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 320px;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: -60px;
  color: #ffffff;
  font-size: 48px;
  font-weight: 900;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px
    font-size: 36px;
  }

  @media (max-width: 576px) {
    height: 160px;
    font-size: 16px;
    margin-top: -20px;
  }
`;

const BolderH2 = styled(H2)`
  font-weight: 700;
`;

const Table = styled.table`
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
  margin-cottom:

  & tr:first-child td {
    border-top: 1px solid #a1a1a1;
  }

  @media (max-width: 576px) {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Td = styled.td`
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
  border-collapse: collapse;
  box-sizing: border-box;
  vertical-align: top;
  font-size: 20px;
  font-weight: 400;

  &:first-child {
    width: 35%;
  }

  @media (max-width: 576px) {
    &:first-child {
      width: 65%;
    }
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(3) {
      display: none;
    }
  }
`;

const CellLink = styled.a`
  color: #0081ff;
  text-decoration: none;
`;
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const H1 = styled.h1`
  color: #000000;
  font-size: 36px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const H2 = styled.h2`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
`;

export const H3 = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`;

export const H4 = styled.h4`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
`;

export const P = styled.p`
  color: #a1a1a1;
  font-size: 14px;
  line-height: 25px;
`;

export const A = styled(Link)`
  color: #fd3649;
  font-weight: 400;
  text-decoration: underline;
`;
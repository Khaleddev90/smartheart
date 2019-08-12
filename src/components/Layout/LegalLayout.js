import React  from 'react';
import styled from 'styled-components';
import GradientHeader from 'components/UI/GradientHeader';
import NavigationFooter from 'components/UI/NavigationFooter';
import ScrollToTop from 'components/ScrollToTop';

const menuItems = [
  {
    to: '/terms-of-use',
    label: 'Terms of Use',
  },
  {
    to: '/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    to: '/cookie-policy',
    label: 'Cookie Policy',
  },
];

export default function LegalLayout({ children }) {
  return (
    <ScrollToTop>
      <GradientHeader items={menuItems} />
      <Container>
        {children}
      </Container>
      <NavigationFooter />
    </ScrollToTop>
  )
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 840px;
  padding: 0;

  @media (max-width: 768px) {
    max-width: 768px;
    padding: 0 20px;
  }
`;

import React  from 'react';
import styled from 'styled-components';
import GradientHeader from 'components/UI/GradientHeader';
import NavigationFooter from 'components/UI/NavigationFooter';
import ScrollToTop from 'components/ScrollToTop';

const menuItems = [
  {
    to: '/jobs',
    label: 'Jobs',
  },
  {
    to: 'http://heartface.zendesk.com/',
    label: 'Support',
    external: true,
  },
  {
    to: 'http://blog.heartface.tv/',
    label: 'Blog',
    external: true,
  },
];

export default function CompanyLayout({ children }) {
  return (
    <ScrollToTop>
      <GradientHeader items={menuItems} />
      <Body>
        {children}
      </Body>
      <NavigationFooter />
    </ScrollToTop>
  )
}

const Body = styled.div`
  flex-grow: 1;
`;



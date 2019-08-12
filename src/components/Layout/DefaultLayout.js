import React  from 'react';
import styled from 'styled-components';
import Header from 'components/Main/Header'
import Footer from 'components/UI/Footer'
import ScrollToTop from 'components/ScrollToTop';
import withLoginPopup from 'components/hoc/withLoginPopup'
import { Container } from 'components/UI/Container'
function DefaultLayout({
  children,
  history,
  token,
  togglePopup,
  popup: { isToggled, type },
}) {
  return (
    <ScrollToTop>
      <Cover>
        <Container>
          <Header
            history={history}
            token={token}
            openPopup={() => togglePopup({ type: 'login', isToggled: true })}
            isPopupOpen={isToggled && type === 'login'}
            />
        </Container>
      </Cover>
      <Body>
        {children}
      </Body>
      <Footer
        history={history}
        token={token}
        openPopup={() => togglePopup({ type: 'login', isToggled: true })}
        isPopupOpen={isToggled && type === 'login'}
      />
    </ScrollToTop>
  )
}

const Cover = styled.div`
  background: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  flex-grow: 1;
`;

export default withLoginPopup(DefaultLayout);
import React from 'react'
import styled from 'styled-components'
import AccountModal from './AccountModal'
import defaultPhoto from 'assets/Tickerface@3x.gif';


const Header = ({
    popup: { type, isToggled },
    toggleAccountModalHandler,
    logout,
    userInfo,
    logoutHandler,
    history,
    closeAccountModalHandler,
  }) => {

    const { photo, username } = userInfo
  return (
   <Content>
      <Name>{username}</Name>
      <Avatar
        onClick={() => toggleAccountModalHandler()}
        src={photo ? photo : defaultPhoto}
      />
      {
        <AccountModal
          history={history}
          toggleAccountModalHandler={toggleAccountModalHandler}
          closeAccountModalHandler={closeAccountModalHandler}
          logoutHandler={logoutHandler}
          userInfo={userInfo}
          isAccountPopupOpen={isToggled && type === 'account'} />
      }
   </Content>
  )
}

export default Header

const Content = styled.div`
  background: #fd3649;
  height: 60px;
  display: flex;
  justify-content; end,
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  position: relative;

`
const Name = styled.div`
  margin-right: 20px;
  color: white;
  font-size: 18px;
`
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 50px;
  cursor: pointer;
  pointer-events: all;
`

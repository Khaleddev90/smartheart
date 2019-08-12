import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AccountModal from './AccountModal'
import defaultPhoto from 'assets/Tickerface@3x.gif';
import logo from 'assets/heartface-logo-red-3x.png'

const DashboardHeader = ({
    popup: { type, isToggled },
    toggleAccountModalHandler,
    userInfo,
    logoutHandler,
    history,
    closeAccountModalHandler,
    videos,
    followers,
    followings,
    selectPageHandler,
  }) => {

    const { photo, username, full_name } = userInfo
  return (
   <Content>
      <Link to="/">
        <Logo src={logo} alt="Logo"/>
      </Link>
      <Avatar
        onClick={() => toggleAccountModalHandler()}
        src={photo ? photo : defaultPhoto}
      />
      <Name>{full_name}</Name>
      <UserName>@{username}</UserName>

      { videos? <BlueDiv onClick={() => selectPageHandler(1)}>{videos.length > 1000 ? Math.ceil(videos.length / 1000) + 'k' : videos.length}</BlueDiv> : <BlueDiv>...</BlueDiv> }
      <CommonLabel>Videos</CommonLabel>

      { followers? <BlueDiv onClick={() => selectPageHandler(2)}>{followers.length > 1000 ? Math.ceil(followers.length / 1000) + 'k' : followers.length}</BlueDiv> : <BlueDiv>...</BlueDiv> }
      <CommonLabel>Followers</CommonLabel>

      { followings? <BlueDiv  onClick={() => selectPageHandler(3)}>{followings.length > 1000 ? Math.ceil(followings.length / 1000) + 'k' : followings.length}</BlueDiv> : <BlueDiv>...</BlueDiv> }
      <CommonLabel>Following</CommonLabel>
      
      <SettingDiv>
        <Divider />
        <SettingLabel onClick={() => selectPageHandler(0)}><span role='img' aria-label='alert' >☁️</span> Upload Video</SettingLabel>
        <Divider />
        <SettingLabel onClick={() => selectPageHandler(4)}><span role='img' aria-label='alert' >💰</span> Earnings</SettingLabel>
        <Divider />
        <SettingLabel onClick={() => selectPageHandler(5)}><span role='img' aria-label='alert' >⚙️</span> Settings</SettingLabel>        
      </SettingDiv>

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

export default DashboardHeader

const Content = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 288px;
  align-items: center;
  position: relative;
`

const SettingDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 15px;
`

const Name = styled.div`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`

const BlueDiv = styled.div`
  font-size: 62px;
  color: #4A90E2;
  margin-top: 20px;
  font-weight: bold;
`
const UserName = styled.div`
  color: black;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
`

const CommonLabel = styled.div`
  font-size: 24px;
  color: black;
  margin-top: 10px;
`

const SettingLabel = styled(CommonLabel)`
  margin-left: 20px;
  margin-top: 0px;
`

const Avatar = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  min-width: 180px;
  min-height: 180px;
  margin-top: 40px;
`
const Logo = styled.img`
  margin-top: 40px;
  width: 149px;
  height: 32px;
  @media (max-width: 767px) {
    flex: 0 0 auto;
  }
`;

const Divider = styled.hr`
  border-top: .5px solid #eee;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
`
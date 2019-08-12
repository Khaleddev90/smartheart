import React, { Component } from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

class Followers extends Component {
  
  render() {
    const {
      followers,
    } = this.props
    
    return (
      <Content ready={true}>
        <Title>Followers</Title>
        <Container>
        {
					followers ?
						followers.map((item, key) => {
							const { full_name, photo, username } = item
							return (
							<ItemContent key={key}>
									<UserPhoto src={photo}/>
									<UserContent>
											<FullName>{full_name}</FullName>
											<UserName>@{username}</UserName>
									</UserContent>
							</ItemContent>)
						}) 
					:
					<Placeholder>
						<Spinner name="line-scale-pulse-out-rapid" />
					</Placeholder>
        }
        </Container>
      </Content>
    )
  }
}

export default Followers;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.ready
    ?
    'justify-content: null; align-items: null;'
    :
    ' justify-content: center; align-items: center;'}
  margin: 40px 0;
`

const Container = styled.div`
  content: "";
  display: table;
	clear: both;
	padding-left: 100px;
	padding-right: 100px;
`

const Title = styled.h1`
  font-size: 32px;
  padding: 10px 0;
  align-self: flex-start;
  color: white;
  margin-left: 100px;
`

const Placeholder = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
`

const ItemContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 50px;
	float: left;
	width: 33.3333%;
	border: 0px solid;
	box-sizing: border-box;
	color: white;
`

const UserPhoto = styled.div`
	width: 100px;
	height: 100px;
	min-height: 100px;
	min-width: 100px;
	border-radius: 50px;
	background-image: ${props => props.src ? `url(${props.src})` : 'url(https://product.dev.heartface.tv/images/full/902bef3….jpg)'};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
`

const UserContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	margin-right: 20px;
	flex: 1;
`
const FullName = styled.div`
	color: #FFFFFF;
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 10px;
`

const UserName = styled.div`
	display: flex;
	flex-direction: row;
	color: #FFFFFF;
	font-weight: 200;
	font-size: 24px;
`
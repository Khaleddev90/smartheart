import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Layout from 'components/hoc/Layout/index'

export default class Follow extends Component {

	componentDidMount = () => {
		this.props.getRecommanded()
	}

	unFollowHandler = (userId) => {
		this.props.unFollowUser(userId)
	}

	followHandler = (userId) => {
		this.props.followUser(userId)
	}
	
  render() {
		const {
			history,
		} = this.props
		
		let goButton = (this.props.followedUsers && this.props.followedUsers.length > 2) ? <GoButton onClick={(e) => history.push('/dashboard')}>Go to dashboard</GoButton> : <GoButton disabled>Follow at least 3</GoButton>
    return (
			<Layout hidefooter>
				<Content>
					<Helmet>
						<title>Follow</title>
					</Helmet>
					<TitleLabel>Build your feed</TitleLabel>
					<SubContent>
						{ this.props.recommandUsers ? (
								this.props.recommandUsers.map((item, key) => {
									const { full_name, photo, username } = item
									return (
										<Row key={key}>
											<ItemContent>
												<UserPhoto src={photo}/>
												<UserContent>
													<FullName>{full_name}</FullName>
													<UserName>@{username}</UserName>
												</UserContent>
												{this.props.followedUsers && this.props.followedUsers.filter((user) => user === item.id).length > 0 ? 
													<FollowButton onClick={(e) => this.unFollowHandler(item.id)}>Unfollow</FollowButton>
													:
													<FollowButton onClick={(e) => this.followHandler(item.id)}>Follow</FollowButton>
												}												
											</ItemContent>
										</Row>
									)
								})
							) :	''
						}						
						<RowModel>
							{goButton}
						</RowModel>
					</SubContent>
				</Content>
			</Layout>
    )
  }
}
const ItemContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`

const UserPhoto = styled.div`
	width: 53px;
	height: 53px;
	border-radius: 26px;
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
	color: #000000;
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 10px;
`

const UserName = styled.div`
	display: flex;
	flex-direction: row;
	color: #A1A1A1;
	font-weight: 100;
	font-size: 17px;
`

const TitleLabel = styled.div`
	text-align: center;
	margin-top: 40px;
	margin-bottom: 30px;
	font-size: 48px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`
const SubContent = styled.div`
  display: flex;
	flex-direction: column;
	margin: 0 20%;
`

const CustomButton = styled.div`
  border: 3px solid #000;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 12px;
  text-align: center;
	font-size: 18px;
  color: #000;
  -webkit-transition: border,color .5s;
  transition: border,color .5s;
  -webkit-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
	border: none;
	padding: 13px;
	margin: auto;
	width: 232px;
	color: white;
`

const GoButton = styled(CustomButton)`
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	margin: auto;
	margin-top: 5px;
	color: white;
	padding: 22px 51px;
	font-size: 33px;
	background-color: ${props => props.disabled ? '#4A4A4A' : '#0081FF'};
`

const RowModel = styled.div`
  	content: '';
  	display: inline-block;
  	clear: both;
  	width: 100%;
  	margin-top: 20px;
`
const Row = styled(RowModel)`
	border-bottom: 1px solid #e0dddd;
`
const FollowButton = styled(CustomButton)`
	width: 100px;
	border: none;
	color: #A1A1A1;
	font-size: 16px;
`
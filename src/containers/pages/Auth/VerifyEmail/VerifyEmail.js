import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Layout from 'components/hoc/Layout/index'

export default class VerifyEmail extends Component {

	state = {
		email: "",
		name: ""
	}

  componentDidMount = () => {
	
	}
	
	getUserInfo = () => {
		this.setState({
			email: localStorage.getItem('user_email'),
			name: localStorage.getItem('username')
		})
	}

	handleVerify = (e) => {
		this.props.verifyEmail()
	}
  render() {
		const {
			history,
			userInfo
		} = this.props
		const { 
			email
		} = userInfo
    return (
			<Layout hidefooter history={history}>
				<Content>
					<Helmet>
						<title>Dashboard</title>
					</Helmet>
					<TitleLabel>You’re in <span role='img' aria-label='alert' >🎉</span> Check your email!</TitleLabel>
					<EmailLabel>({email})</EmailLabel>
					<ResendButton onClick={(e) => this.handleVerify(e)}>Resend email</ResendButton>
					<LaterButton onClick={(e) => history.push('/finishsignup')}>Do it later</LaterButton>  
				</Content>
			</Layout>
			
    )
  }
}

const TitleLabel = styled.div`
	text-align: center;
	margin-top: 282px;
	font-size: 38px;
`

const EmailLabel = styled.div`
	text-align: center;
	color: #A1A1A1;
	font-size: 14px;
	font-weight: normal;
	margin-top: 20px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const CustomButton = styled.div`
  border: 3px solid #000;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 12px;
  text-align: center;
	font-size: 24px;
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

const ResendButton = styled(CustomButton)`
	background: #FD3649;
	margin-top: 80px;
`

const LaterButton = styled(CustomButton)`
	background: #C6C6C6;
	margin-top: 20px;
`

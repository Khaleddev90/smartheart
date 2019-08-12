import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { Redirect, Link } from 'react-router-dom'


export default class BankSettings extends Component {

    state = {
        isStep: 0,
        first_name: '',
        last_name: '',
        address: '',
        post_code: '',
        city: '',
        account_number: '',
        uk_sort_code: ''
    }

    handleStep = (step) => {
        this.setState({
            isStep: step
        })
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFinishSetup = () => {
        const { finishSetup } = this.props
        finishSetup()
    }

    renderSuccess = () => {

        const { handleFinishSetup } = this

        return (

            <Content center >
                <Helmet>
                    <title>You're all set up</title>
                </Helmet>
                <Emoji role='img'aria-label='money-mouth face' // eslint-disable-line
                >🤑</Emoji>
                <Title center>You're all set up</Title>
                <StyledLink
                    onClick={() => handleFinishSetup()}
                    to='/transactions'>Go to earnings</StyledLink>
            </Content>
        )
    }

    renderDetails = () => {

        const {
            handleStep,
            handleInputs
        } = this

        const { account_number, uk_sort_code } = this.state

        const isButtonActive = account_number && uk_sort_code !== ''

        return (
            <Content>
            <Frame>
                <Helmet>
                  <title>Bank Details</title>
                </Helmet>
                <Title>Bank Details</Title>
                <Text>This is where we would be sending your Heartface revenue.</Text>
                <InformationForm onChange={(e) => handleInputs(e)} >
                    <InputContent
                        width={'35%'}>
                        <span>Account Number</span>
                        <StyledInput
                            value={account_number}
                            name='account_number'
                            placeholder='12345678' />
                    </InputContent>
                    <InputContent
                        width={'35%'} >
                        <span>UK Sort Code</span>
                        <StyledInput
                            value={uk_sort_code}
                            name='uk_sort_code'
                            placeholder='12-34-56'
                             />
                    </InputContent>
                    <Button
                        disabled={!isButtonActive}
                        isActive={isButtonActive === true}
                        onClick={() => handleStep(2)}
                    >Submit</Button>
                </InformationForm>
            </Frame>
        </Content>
        )
    }

    renderSetup = () => {

        const { handleStep, handleInputs } = this
        const { first_name, last_name, address, post_code, city  } = this.state

        const isButtonActive = first_name && last_name && address && post_code && city !== ''

        return (
        <Content>
            <Frame>
                <Helmet>
                  <title>Nice to meet you</title>
                </Helmet>
                <Title>Nice to meet you</Title>
                <Text>We need some information from you before you can start earning.
                    Please ensure this is accurate and matches your bank account.</Text>
                <InformationForm onChange={(e) => handleInputs(e)}>
                    <InputContent
                        width={'35%'}>
                        <span>First Name</span>
                        <StyledInput
                            value={first_name}
                            name='first_name'
                            placeholder='Sean' />
                    </InputContent>
                    <InputContent
                        width={'35%'}>
                        <span>Last Name</span>
                        <StyledInput
                            value={last_name}
                            name='last_name'
                            placeholder='Anderson'
                            />
                    </InputContent>
                    <InputContent
                        width={'85%'}>
                        <span>Address</span>
                        <StyledInput
                            value={address}
                            name='address'
                            placeholder='1A, 234 Street'
                            />
                    </InputContent>
                    <InputContent
                        width={'35%'}>
                        <span>Post Code</span>
                        <StyledInput
                            value={post_code}
                            name='post_code'
                            placeholder='AA9A 9AA' />
                    </InputContent>
                    <InputContent
                        width={'35%'}>
                        <span>City</span>
                        <StyledInput
                            value={city}
                            name='city'
                            placeholder='London' />
                    </InputContent>
                    <Button
                        disabled={!isButtonActive}
                        isActive={isButtonActive === true}
                        onClick={() => handleStep(1)}
                    >Next</Button>
                </InformationForm>
            </Frame>
        </Content>
        )

    }

    render() {

        const {
            renderSetup,
            renderDetails,
            renderSuccess
         } = this

        const { isStep } = this.state

        switch (isStep) {
            case 0:
            return renderSetup()
            case 1:
            return renderDetails()
            case 2:
            return renderSuccess()
            default:
            return <Redirect to='/'/>
        }
    }
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.center ? '0' : '50px'};
  align-items: center;
  justify-content: ${props => props.center ? 'center' : null};
  height: ${props => props.center ? '100vh' : 'auto'};
`

const Emoji = styled.span`
    font-size: 80px;
`

const Frame = styled.div`
    display: flex;
    flex-direction: column;
    width: 640px;

`
const Title = styled.h1`
    font-size: 38px;
    letter-spacing: 1.5px;
    width: 100%;
    text-align: ${props => props.center ? 'center' : 'left'};
`
const Text = styled.div`
    color: #aaa;
    font-weight: 300;
    font-size: 24px;
    width: 100%;
`

const InformationForm = styled.form`
    width: 95%;
    display: flex;
    flex-flow: row wrap;

`

const InputContent = styled.div`
     margin: 40px 0px 0 45px;
     width: ${props => props.width};
     position: relative;

      span {
        position: absolute;
        top: 20px;
        left: 15px;
        font-weight: 600;
        letter-spacing: 1.5px;
    }

`

const StyledInput = styled.input`
    width: 85%;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 65px 15px 15px;
    font-size: 26px;
    font-weight: 300;
    outline: none;
`

const Button = styled.button`
    margin: 30px 100px 30px auto;
    padding: 8px 20px 10px 160px;
    background: ${props => props.isActive ? '#fd3649' : '#aaa'};
    color: #fff;
    border-radius: 5px;
    border: none;
    letter-spacing: 1.5px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    transition: all .5s;
`

const StyledLink = styled(Link)`
    padding: 10px 20px;
    text-decoration: none;
    color: #fff;
    background: #fd3649;
    border-radius: 10px;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 1.5px;
`
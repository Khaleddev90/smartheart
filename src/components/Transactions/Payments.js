import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default class Payments extends Component {
  state = {
    inputValue: "This month"
  }

  onChangeHandle = (e) => {
    const value = e.target.value
    this.setState({
      inputValue: value
    })
  }

  render () {
    const { inputValue } = this.state

    return (
      <Wrapper>
        <Input onChange={(e) => this.onChangeHandle(e)}>
          { inputValue }
        </Input>
        <PaymentValueWrapper>
          <PaymentValue>
            £248.57
          </PaymentValue>
        </PaymentValueWrapper>
        <Hint>
          Your next payment is due and will be credited to your account on <Span>01 March 2018</Span>
        </Hint>
        <StyledLink
        to='/account_settings'>View/Edit bank details</StyledLink>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div `
   max-width: 320px;
   display: flex;
   flex-flow: column;
`

const Input = styled.div `
  outline: none;
  border-radius: 5px;
  border: 1px solid #DEDEDE;
  padding: 5px 0 10px;
  flex: 1;
  text-align: center;
  font-size: 1.25em;
  margin-bottom: 20px;
 `

const PaymentValueWrapper = styled.div `
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 30px;
  margin-bottom: 5px;
`

const PaymentValue = styled.div `
  font-size: 30px;
  font-weight: bold;
  color: rgb(35, 207, 94);
`

const Hint = styled.div `
  color: rgb(185, 185, 185);
  font-size: 1em;
  display: inline;
`

const Span = styled.div `
  display: inline;
  color: rgb(161, 161, 161);
  margin-left: 5px;
`

const StyledLink = styled(Link) `
  color: rgb(161, 161, 161);
  font-weight: bold;
  font-size: 1em;
  text-align: right;
  margin-top: 10px;
  cursor: pointer;
`
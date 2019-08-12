import React from 'react'
import styled from 'styled-components'

const PastTransactions = (props) => {
  // const {  } = props

  return (
    <Wrapper>
      <Title>Past Transactions</Title>
      <Table>
        <Row grey>
          <Cell width="33.33%" bold>Date</Cell>
          <Cell bold>Details</Cell>
          <Cell width="33.33%" bold>Amount(£)</Cell>
        </Row>
        <Row>
          <Cell width="33.33%">26/02/2018</Cell>
          <Cell>Earnings paid to HSBC Bank account number xxxxxx123</Cell>
          <Cell width="33.33%">120.45</Cell>
        </Row>
      </Table>
    </Wrapper>
  )
}

export default PastTransactions

const Wrapper = styled.div `

`

const Title = styled.div `
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
  text-align: center;
`

const Table = styled.div `
  border-radius: 5px;
  margin-bottom: 40px;
`

const Row = styled.div `
  padding: 10px ;
  background-color: ${props => props.grey ? 'rgb(235, 235, 235)' : '#fff'};
  display: flex;
  align-items: center;
  border-radius: 5px;
`

const Cell = styled.div `
  width: ${props => props.width ? props.width : '100%'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  font-size: 20px;
  letter-spacing: 1px;
  padding: 0 20px;
`

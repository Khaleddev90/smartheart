import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import Payments from 'components/Transactions/Payments'
import PastTransactions from 'components/Transactions/PastTransactions'
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import { Redirect } from 'react-router-dom'
import Layout from 'components/hoc/Layout/Layout';
const data = [
  {name: 'Jan'},
  {name: 'Feb'},
  {name: 'Mar'},
  {name: 'Apr'},
];

export default class Transactions extends Component {
  render() {
    const { history, hasAccount } = this.props
    if (hasAccount) {
      return (
        <Layout history={history}>
          <Wrapper>
            <Helmet>
              <title>Transactions</title>
            </Helmet>
            <GraphContainer>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis
                  dataKey="name"/>
                <YAxis/>
                <CartesianGrid
                  strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
              </LineChart>
              <Payments />
            </GraphContainer>
            <PastTransactions />

          </Wrapper>
        </Layout>
      )
     } else return <Redirect to='/account_settings' />

  }
}

const Wrapper = styled.div `

`

const GraphContainer = styled.div `
  display: flex;
  justify-content: space-between;
  margin-top: 65px;
  margin-bottom: 40px;
`

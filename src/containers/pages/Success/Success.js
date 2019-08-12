import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import facebook from 'assets/facebook.svg'
import twitter from 'assets/twitter.svg'
import Layout from 'components/hoc/Layout/Layout';

export default class Success extends Component {
  render() {
    const {history} = this.props
    return (
      <Layout history={history}>
        <Content>
          <Helmet>
            <title>Upload</title>
          </Helmet>
          <Title>
            Upload Successful
            <span>Share your video now</span>
          </Title>
          <Providers>
            <Provider src={facebook} />
            <Provider src={twitter} />
          </Providers>
          <Skip to={'/dashboard'}>Skip</Skip>
        </Content>
      </Layout>
    )
  }
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: 5% 0;
  height:100%;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 5em;
  font-weight: 700;
  margin-bottom: 40px;

  span {
    font-weight: 300;
  }
`
const Providers = styled.div`
  display: flex;
  margin: 0 100px;
  justify-content: space-around;
`
const Provider = styled.img`
  height: auto;
  width: 200px;

`
const Skip = styled(Link)`
  margin-top: 50px;
  text-decoration: none;
  font-size: 1.5625em;
  color: #888;
  text-align: center;
`